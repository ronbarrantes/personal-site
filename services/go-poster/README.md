# Go Poster Service

Receives normalized post JSON and forwards it to your backend.

## Endpoints

- `GET /health` → `{ "status": "ok" }`
- `POST /post` → forwards payload to backend

## Env

- `POSTER_PORT` (default `8081`)
- `BACKEND_BASE_URL` (required)
- `BACKEND_POSTS_ENDPOINT` (default `/api/now`)
- `BACKEND_API_KEY` (optional)
- `BACKEND_TIMEOUT_SECONDS` (default `15`)