import os
import re
import logging
from typing import List, Optional, Tuple

logger = logging.getLogger("mcp_poster.core")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
USER_VOICE_HINT = os.getenv("USER_VOICE_HINT", "").strip()

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
    title, remaining = extract_yaml_front_matter(text)
    if title:
        return title, remaining.strip()

    lines = [ln for ln in text.splitlines()]
    for idx, ln in enumerate(lines):
        if ln.strip():
            m = TITLE_LINE_RE.match(ln.strip())
            if m:
                title = m.group(1).strip()
                content = "\n".join(lines[idx + 1 :]).strip()
                return title, content
            break

    for idx, ln in enumerate(lines):
        if ln.strip().startswith("# "):
            title = ln.strip()[2:].strip()
            content = "\n".join(lines[:idx] + lines[idx + 1 :]).strip()
            return title, content

    return None, text


def detect_tags(text: str) -> List[str]:
    tags = [m.group(1).lower() for m in HASHTAG_RE.finditer(text)]
    seen = set()
    unique: List[str] = []
    for t in tags:
        if t not in seen:
            seen.add(t)
            unique.append(t)
    return unique


def openai_generate_title(content: str, hint: str) -> Optional[str]:
    if not OPENAI_API_KEY:
        return None
    try:
        from openai import OpenAI  # type: ignore

        if os.getenv("OPENAI_API_KEY", "").strip() == "" and OPENAI_API_KEY:
            os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

        client = OpenAI()
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
        title = title.splitlines()[0].strip('\"\' ')
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