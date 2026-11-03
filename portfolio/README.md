# Fakhira Zahrany — 3D Portfolio

Personal React + TypeScript + Three.js portfolio, adapted from the supplied MIT-licensed Kabir Singh 3D portfolio template. Retains its supplied 3D character; redesigned layout and interactions. Original copyright is preserved in LICENSE.

## Run on Windows

Install Node.js 20.19+ or 22.12+. From this `portfolio` folder:

```powershell
npm ci
npm run dev
```

Open the URL printed by Vite. Stop with Ctrl+C. Production build: `npm run build`; local production preview: `npm run preview`.

## Personalize

Edit `src/data.ts` for name, bio, skills and project descriptions. Add an object to `projects` to add a project, including a matching category. Public project information was verified against GitHub READMEs. Luxe Nail is labelled a group project; no individual role or invented employment history is claimed. Project cover art is decorative typography, not screenshots of the applications. Contacts link to the verified GitHub profile; no placeholder contact forms or CV downloads.

## Features

- Original 3D character with pointer-reactive head and blink animation.
- Three curated projects, category filtering and keyboard-accessible native detail dialogs.
- Responsive mobile layout, motion toggle and reduced-motion preference support.
- Nonblocking fallback when WebGL or the model cannot load.
- Local Draco decoder and model assets; no runtime CDN required for 3D.
- Relative production paths for subdirectory hosting.

Serve via localhost or HTTPS; do not open index.html directly. WebGL availability depends on the browser/device. Google Fonts is optional; system fonts are the fallback.

## Deploy

The build output is `dist/`. For hosting providers, set the root directory to `portfolio`, build command `npm ci && npm run build`, and output directory `dist`. This source commit does not activate hosting or change the profile README.
