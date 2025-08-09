import os
import re
import json
import logging
from typing import List, Optional, Tuple
from urllib.parse import urljoin

import requests
from flask import Flask, request, jsonify

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("agent")

AGENT_PORT = int(os.getenv("AGENT_PORT", "5001"))
POSTER_SERVICE_URL = os.getenv("POSTER_SERVICE_URL", "http://localhost:8081")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
USER_VOICE_HINT = os.getenv("USER_VOICE_HINT", "").strip()
DEFAULT_DRAFT = os.getenv("DEFAULT_DRAFT", "false").lower() == "true"

HASHTAG_RE = re.compile(r"(?<!\w)#([A-Za-z0-9_-]{2,})")
YAML_TITLE_RE = re.compile(r"^title:\s*(.+)$", re.IGNORECASE)
TITLE_LINE_RE = re.compile(r"^title\s*:\s*(.+)$", re.IGNORECASE)


def title_case(s: str) -> str:
    return re.sub(r"\s+", " ", s.strip()).strip().strip("-_. ").title()


def clean_sentence_for_title(s: str) -> str:
    s = re.sub(r"https?://\S+", "", s)
    s = HASHTAG_RE.sub("", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def extract_yaml_front_matter(text: str) -> Tuple[Optional[str], str]:
    lines = text.splitlines()
    if len(lines) >= 3 and lines[0].strip() == "---":
        title_value = None
        end_idx = 1
        while end_idx < len(lines) and lines[end_idx].strip() != "---":
            m = YAML_TITLE_RE.match(lines[end_idx])
            if m and not title_value:
                title_value = m.group(1).strip().strip('"\'')
            end_idx += 1
        if end_idx < len(lines) and lines[end_idx].strip() == "---":
            content = "\n".join(lines[end_idx + 1 :])
            return title_value, content
    return None, text


def extract_title_and_content(raw_text: str) -> Tuple[Optional[str], str]:
    text = raw_text.strip()
    # YAML front matter
    title, remaining = extract_yaml_front_matter(text)
    if title:
        return title, remaining.strip()

    # Title: prefix on first non-empty line
    lines = [ln for ln in text.splitlines()]
    for idx, ln in enumerate(lines):
        if ln.strip():
            m = TITLE_LINE_RE.match(ln.strip())
            if m:
                title = m.group(1).strip()
                content = "\n".join(lines[idx + 1 :]).strip()
                return title, content
            break

    # Markdown H1
    for idx, ln in enumerate(lines):
        if ln.strip().startswith("# "):
            title = ln.strip()[2:].strip()
            content = "\n".join(lines[:idx] + lines[idx + 1 :]).strip()
            return title, content

    return None, text


def detect_tags(text: str) -> List[str]:
    tags = [m.group(1).lower() for m in HASHTAG_RE.finditer(text)]
    # unique preserve order
    seen = set()
    unique = []
    for t in tags:
        if t not in seen:
            seen.add(t)
            unique.append(t)
    return unique


def openai_generate_title(content: str, hint: str) -> Optional[str]:
    if not OPENAI_API_KEY:
        return None
    try:
        # Lazy import; optional dependency
        from openai import OpenAI  # type: ignore

        client = OpenAI(api_key=OPENAI_API_KEY)
        prompt = (
            "You are a helpful writing assistant. Propose a concise blog post title (max 70 chars) "
            "that sounds like the author's voice. Avoid quotes. Return only the title."
        )
        if hint:
            prompt += f" Author's style hint: {hint}"

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": content[:4000]},
            ],
            temperature=0.6,
            max_tokens=32,
        )
        title = (completion.choices[0].message.content or "").strip()
        # Defensive post-process
        title = title.splitlines()[0]
        title = title.strip("\"' ")
        return title
    except Exception as e:
        logger.warning("OpenAI title generation failed: %s", e)
        return None


def heuristic_generate_title(content: str) -> str:
    sentences = re.split(r"(?<=[.!?])\s+|\n+", content.strip())
    first = next((s for s in sentences if s.strip()), "Untitled")
    cleaned = clean_sentence_for_title(first)
    if len(cleaned) > 70:
        cleaned = cleaned[:67].rstrip() + "..."
    return title_case(cleaned) if cleaned else "Untitled"


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/create-post")
def create_post():
    dry_run = request.args.get("dry_run", "false").lower() == "true"
    draft_qs = request.args.get("draft")

    raw_text: Optional[str] = None
    if request.content_type and request.content_type.startswith("text/plain"):
        raw_text = request.get_data(as_text=True)
    else:
        try:
            data = request.get_json(silent=True) or {}
            if isinstance(data, dict) and "text" in data:
                raw_text = str(data.get("text") or "")
        except Exception:
            raw_text = None

    if not raw_text or not raw_text.strip():
        return jsonify({"error": "Expected raw text in body (text/plain) or JSON {text}"}), 400

    explicit_title, content = extract_title_and_content(raw_text)

    if explicit_title:
        title = explicit_title.strip()
    else:
        # Generate a title
        title = openai_generate_title(content, USER_VOICE_HINT) or heuristic_generate_title(content)

    tags = detect_tags(raw_text)

    # Draft handling precedence: query param > env default
    draft_value = DEFAULT_DRAFT
    if draft_qs is not None:
        draft_value = draft_qs.lower() == "true"

    payload = {
        "title": title,
        "content": content.strip(),
        "tags": tags,
        "draft": draft_value,
        "metadata": {
            "source": "python-agent",
            "model": "openai" if OPENAI_API_KEY else "heuristic",
        },
    }

    if dry_run:
        return jsonify({"dry_run": True, "payload": payload}), 200

    # Call the poster service
    try:
        url = urljoin(POSTER_SERVICE_URL.rstrip("/") + "/", "post")
        resp = requests.post(url, json=payload, timeout=20)
        return (resp.text, resp.status_code, {"Content-Type": resp.headers.get("Content-Type", "application/json")})
    except Exception as e:
        logger.exception("Failed to call poster service")
        return jsonify({"error": "Failed to reach poster service", "details": str(e)}), 502


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=AGENT_PORT)