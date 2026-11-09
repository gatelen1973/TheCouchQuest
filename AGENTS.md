---
description: Starter dashboard template
alwaysApply: true
---

## Project identity

This repository is the front end for "JACK BOX" style D&D game where players use their phone that would contain their character sheet and a TV screen that would be the HOST/Storyteller.

Frontend:

- React
- TypeScript
- Vite
- Axios
- Material UI
- Three.js 

The app loads `GET /api/test` and shows the returned array on the Records list. In development, Vite proxies `/api` to `VITE_API_BASE_URL` (`http://localhost:5128` by default).

At this time this template does not include sign-in, permissions, email, or AI clients. Add those only when a future project needs them.

## Agent operating rules

- Follow repository rules before personal preferences.
- Prefer small, reviewable changes.
- Keep feature code in `src/features/<feature>`.
- Keep the Axios client in `src/api/httpClient.ts`.
- Do not add extra dependency without a specific reason.  Threejs is ok.
- PowerShell script execution is disabled. Use Command Prompt compatible commands.

## Frontend layout

- `src/app` owns the shell, theme, and router.
- `src/features/records` owns the sample list and its API call.
- `src/features/shared` owns list chrome, the grid, and empty states.
- Keep page state local. Do not add Redux for a single screen.
- Think Game Show style front end, but in the style of a D&D campaign.  
- The game needs to be interactive and exciting.  Using threejs could help with this.
- 

## Landing Page
- The adventure landing page uses React and TypeScript, Material UI for controls, React Router for navigation, and feature-local CSS for styling and animation.
- Build illustrated scenes with inline SVG and CSS animations.
- Use Three.js only when a scene needs 3D. 
- Start audio only in response to a user action, and respect reduced-motion preferences.  
- Continue to use this technique when working on other pages and sections.