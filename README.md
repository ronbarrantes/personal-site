# Personal Site Post Creator

Three components:

- Golang Gin `poster` service: Receives normalized JSON post payload and forwards it to your existing backend API. Handles auth, timeouts, and basic slug generation.
- Python Flask `agent` service: Accepts a single raw text string, extracts or generates a title in your voice, parses tags, and calls the `poster` service.
- Python MCP `mcp-poster` server: Exposes a `create_post` MCP tool (for Cursor/Claude) that accepts raw text and uses the same logic to post via the `poster` service.

All are configurable via environment variables and can be run locally with Docker or directly.

## High-level Flow

1. Client sends raw text to Python `agent` at `POST /create-post`.
2. Agent:
   - Extracts title if explicitly provided within the text (YAML front matter, `Title:` line, or Markdown `#` header).
   - If no explicit title, generates a title. If `OPENAI_API_KEY` is set, uses LLM; otherwise falls back to a heuristic.
   - Extracts tags from hashtags (e.g., `#go`, `#writing`).
   - Sends structured JSON to the Go `poster` service.
3. Go `poster` service forwards the JSON to your backend API with auth headers.

## Environment

Copy `.env.example` to `.env` and set values.

Key variables:

- `POSTER_PORT` (default: 8081)
- `BACKEND_BASE_URL` (required): Your backend base URL, e.g., `https://your-site/api` or `http://localhost:3000`
- `BACKEND_POSTS_ENDPOINT` (default: `/api/now`)
- `BACKEND_API_KEY` (optional): If your backend requires bearer token auth
- `BACKEND_TIMEOUT_SECONDS` (default: 15)

- `AGENT_PORT` (default: 5001)
- `POSTER_SERVICE_URL` (default: `http://localhost:8081`)
- `OPENAI_API_KEY` (optional): Enable LLM title generation
- `USER_VOICE_HINT` (optional): A short sentence describing your style/voice
- `DEFAULT_DRAFT` (default: `false`)

## Run with Docker

```bash
docker compose up --build
```

Agent: `http://localhost:5001`
Poster: `http://localhost:8081`

MCP Server runs over stdio and is typically launched by your MCP client (not via Docker). See `services/mcp-poster/README.md`.

## Direct Run

- Go poster
  ```bash
  cd services/go-poster
  go run ./...
  ```
- Python agent
  ```bash
  cd services/python-agent
  python -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  flask --app app.py run --host 0.0.0.0 --port 5001
  ```

## Usage

- Create post from raw text
  ```bash
  curl -sS -X POST \
    -H "Content-Type: text/plain" \
    --data-binary @- \
    http://localhost:5001/create-post << 'EOF'
Title: A tiny update on my homelab

I moved my services onto a single NUC and it feels great. #homelab #infra
EOF
  ```

- Without explicit title (agent will generate one)
  ```bash
  curl -sS -X POST \
    -H "Content-Type: text/plain" \
    --data-binary @- \
    "http://localhost:5001/create-post?draft=true" << 'EOF'
Spent the morning cleaning up my dotfiles and finally removed some ancient vim stuff.
EOF
  ```

- Dry run (preview the parsed result without sending to backend)
  ```bash
  curl -sS -X POST \
    -H "Content-Type: text/plain" \
    --data-binary @- \
    "http://localhost:5001/create-post?dry_run=true" << 'EOF'
# On learning Go by building tiny tools

I wrote a quick server to post updates to my site.
EOF
  ```

## Request/Response

Agent `POST /create-post` accepts:
- `text/plain` raw body (preferred) or JSON `{ "text": "..." }`
- Query params:
  - `draft` (bool): Mark as draft
  - `dry_run` (bool): Return parsed payload without posting

Agent forwards to Poster `POST /post` with JSON:
```json
{
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "draft": false,
  "slug": "string",
  "metadata": {"source": "agent", "model": "optional"}
}
```

Poster forwards to backend: `POST ${BACKEND_BASE_URL}${BACKEND_POSTS_ENDPOINT}` with bearer token if provided. Response is proxied back.

## Notes

- Title detection supports:
  - YAML front matter: `---` with `title: ...`
  - `Title: ...` prefix on first non-empty line
  - Markdown H1 `# ...`
- Title generation:
  - If `OPENAI_API_KEY` set, uses an LLM with brief instructions and your `USER_VOICE_HINT`
  - Otherwise uses a deterministic heuristic (first sentence, cleaned and title-cased)
- Tags: Extracted from hashtags `#tag` in the text (letters, digits, `-`, `_`)

## What I added beyond the request

- Hashtag-based tag extraction
- Optional slug generation from title
- Dry-run endpoint behavior for safe testing
- Health endpoints on both services
- Docker Compose for easy local run
- Optional OpenAI integration for title gen with a safe fallback