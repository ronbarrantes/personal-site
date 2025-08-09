import os
import asyncio
from typing import Any, Dict

import requests
from modelcontextprotocol import Server
from modelcontextprotocol.models import (Tool, ToolInputSchema, TextContent)
from modelcontextprotocol.server import stdio_server

from core import (
    extract_title_and_content,
    detect_tags,
    openai_generate_title,
    heuristic_generate_title,
    USER_VOICE_HINT,
)

POSTER_SERVICE_URL = os.getenv("POSTER_SERVICE_URL", "http://localhost:8081").rstrip("/")
DEFAULT_DRAFT = os.getenv("DEFAULT_DRAFT", "false").lower() == "true"


async def create_post_tool(_name: str, arguments: Dict[str, Any]) -> TextContent:
    text = str(arguments.get("text", ""))
    draft_arg = arguments.get("draft")
    dry_run = bool(arguments.get("dry_run", False))

    if not text.strip():
        return TextContent(type="text", text="Error: 'text' is required")

    explicit_title, content = extract_title_and_content(text)
    if explicit_title:
        title = explicit_title.strip()
    else:
        title = openai_generate_title(content, USER_VOICE_HINT) or heuristic_generate_title(content)

    tags = detect_tags(text)

    draft_value = DEFAULT_DRAFT
    if draft_arg is not None:
        try:
            draft_value = bool(draft_arg)
        except Exception:
            pass

    payload = {
        "title": title,
        "content": content.strip(),
        "tags": tags,
        "draft": draft_value,
        "metadata": {
            "source": "mcp-server",
            "model": "openai" if os.getenv("OPENAI_API_KEY", "").strip() else "heuristic",
        },
    }

    if dry_run:
        return TextContent(type="text", text=f"DRY_RUN: {payload}")

    try:
        resp = requests.post(f"{POSTER_SERVICE_URL}/post", json=payload, timeout=20)
        return TextContent(type="text", text=f"{resp.status_code}: {resp.text}")
    except Exception as e:
        return TextContent(type="text", text=f"Error contacting poster: {e}")


async def main() -> None:
    server = Server("mcp-poster", version="0.1.0")

    server.add_tool(
        Tool(
            name="create_post",
            description="Create a blog post from raw text. Optionally set draft and dry_run.",
            input_schema=ToolInputSchema(
                type="object",
                properties={
                    "text": {"type": "string", "description": "Raw post text"},
                    "draft": {"type": "boolean", "description": "Mark as draft"},
                    "dry_run": {"type": "boolean", "description": "Only parse and preview"},
                },
                required=["text"],
            ),
            handler=create_post_tool,
        )
    )

    await stdio_server(server)


if __name__ == "__main__":
    asyncio.run(main())