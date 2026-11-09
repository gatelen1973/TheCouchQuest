# The Couch Quest

The Couch Quest is a React, TypeScript, Vite, and Material UI frontend for a couch co-op D&D-style game. Its landing page features procedural Three.js adventure backdrops; Host and Join are frontend previews and are not connected to game sessions yet.

The Records page at `/records` loads an array from `GET /api/test`. The API is served by a .NET Core backend that accesses a MySQL database.

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
4. Open `http://localhost:3000` for the landing page or `http://localhost:3000/records` for Records.

`npm run dev` proxies `/api` to `VITE_API_BASE_URL` from `.env.development` so the browser does not need CORS. `npm run build` calls that host directly.

## Layout

- `src/app` — shell, theme, and router
- `src/api/httpClient.ts` — Axios client
- `src/features/adventure` — landing page and Three.js scenes
- `src/features/records` — sample list
- `src/features/shared` — list page shell and grid

## Adventure scene photography

The locally bundled backdrop photographs are CC0:

- Forest: [Trail in beech forest, Orlen](https://commons.wikimedia.org/wiki/File:Trail_in_beech_forest,_Orlen.jpg)
- Cave: [Postojna cave interior 03](https://commons.wikimedia.org/wiki/File:Postojna_cave_2008-02-01_interior_03.jpg)
- Castle: [Neuschwanstein Castle](https://commons.wikimedia.org/wiki/File:Neuschwanstein_Castle_(532850).jpg)
