# Dashboard template

React, TypeScript, Vite, and Material UI starter. The Records page loads an array from `GET /api/test`.
The API is served by a .NET Core backend that accesses a MySQL database.

Each item looks like:

```json
{
  "id": 1,
  "column1": "Malcolm \"Mal\" Reynolds",
  "column2": 1,
  "column3": 100,
  "column4": "2026-10-26T17:55:30"
}
```

## Development

1. Install dependencies with `npm install`.
2. Start the API at `http://localhost:5128`.
3. Start the app with `npm run dev`.
4. Open `http://localhost:3000`.

`npm run dev` proxies `/api` to `VITE_API_BASE_URL` from `.env.development` so the browser does not need CORS. `npm run build` calls that host directly.

## Layout

- `src/app` — shell, theme, and router
- `src/api/httpClient.ts` — Axios client
- `src/features/records` — sample list
- `src/features/shared` — list page shell and grid
