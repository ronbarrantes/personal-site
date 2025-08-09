# MCP Poster Server

Exposes a Model Context Protocol tool `create_post` that accepts raw text and posts it via the Go poster service.

## Install

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## Run (stdio)

```bash
python server.py
```

Configure your MCP client (e.g., Claude Desktop or Cursor) to launch `python server.py` in this directory and pass through env vars:

- `POSTER_SERVICE_URL` (default `http://localhost:8081`)
- `OPENAI_API_KEY` (optional for nicer titles)
- `DEFAULT_DRAFT` (default `false`)

## Tool

- `create_post(text: string, draft?: boolean, dry_run?: boolean)`