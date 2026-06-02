# Personal Site Frontend

Frontend for the personal site. The app uses Next.js with the app router and two live routes:

- `/` renders [src/app/page.tsx](src/app/page.tsx)
- `/login` renders [src/app/login/page.tsx](src/app/login/page.tsx)

## Structure

- `src/app`: Next.js routes, layout, and client providers
- `src/screens`: page-level client UI used by route entrypoints
- `src/components/main-page`: homepage sections
- `src/components/main-login`: login screen cards
- `src/components/shell`: shared page chrome for the live UI
- `src/hooks/use-api.ts`: API and auth queries/mutations
- `src/data/text.ts`: static content for work, portfolio, contact, and social links

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
```

## Environment

- `NEXT_PUBLIC_BACKEND_URL`: URL for the Go backend
- `NEXT_PUBLIC_USE_REACT_QUERY_DEVTOOLS`: set to `true` to include React Query devtools

Update the corresponding deployment environment variables when replacing the Vite deployment.
