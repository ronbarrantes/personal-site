# Python Agent

Accepts raw text and turns it into a structured post payload, then calls the Go poster service.

## Endpoints

- `GET /health` → `{ "status": "ok" }`
- `POST /create-post` → accept text, produce payload, and forward

### Request Formats

- `Content-Type: text/plain` with raw body (preferred)
- or JSON `{ "text": "..." }`

Query params:
- `draft=true|false`
- `dry_run=true|false`

## Title Detection/Generation

- YAML front matter `---` with `title: ...`
- `Title: ...` on the first non-empty line
- Markdown H1 `# ...`
- Else generate using OpenAI (if `OPENAI_API_KEY`) or heuristic

## Tags

Extracted from hashtags like `#tag`, deduplicated, lowercased.