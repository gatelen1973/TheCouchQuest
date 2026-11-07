---
description: Starter dashboard template
alwaysApply: true
---

## Project identity

This repository is a small React dashboard template.

Frontend:

- React
- TypeScript
- Vite
- Axios
- Material UI

The app loads `GET /api/test` and shows the returned array on the Records list. In development, Vite proxies `/api` to `VITE_API_BASE_URL` (`http://localhost:5128` by default).

This template does not include sign-in, permissions, email, or AI clients. Add those only when a future project needs them.

## Agent operating rules

- Follow repository rules before personal preferences.
- Prefer small, reviewable changes.
- Reuse the list page in `src/features/records/pages/RecordsListPage.tsx` before inventing new page chrome.
- Keep feature code in `src/features/<feature>`.
- Keep the Axios client in `src/api/httpClient.ts`.
- Do not add a dependency without a specific reason.
- PowerShell script execution is disabled. Use Command Prompt compatible commands.

## Frontend layout

- `src/app` owns the shell, theme, and router.
- `src/features/records` owns the sample list and its API call.
- `src/features/shared` owns list chrome, the grid, and empty states.
- Keep page state local. Do not add Redux for a single screen.
