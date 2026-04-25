# Personal Site Frontend

Frontend for the personal site. The app is a Vite + React single-page app with two live routes:

- `/` renders [src/pages/MainPage.tsx](src/pages/MainPage.tsx)
- `/login` renders [src/pages/MainLogin.tsx](src/pages/MainLogin.tsx)

## Structure

- `src/pages`: route entrypoints
- `src/components/main-page`: homepage sections
- `src/components/main-login`: login screen cards
- `src/components/shell`: shared page chrome for the live UI
- `src/hooks/use-api.ts`: API and auth queries/mutations
- `src/data/text.ts`: static content for work, portfolio, contact, and social links

## Commands

```bash
bun run dev
bun run build
bun run lint
```
