## Metadatapp Next.js App

Next.js + Tailwind frontend for Metadatapp. The legacy Jekyll site has been removed so this repo now only contains the Next app under `next-app/`.

### Getting started
- `cd next-app`
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build` then `npm start`

### Deploying to GitHub Pages
- From `next-app/`, run `npm run export` to generate a static build into `docs/` at the repo root.
- Commit and push the `docs/` folder (and any app changes) to `main`.
- In GitHub → Settings → Pages, choose **Deploy from branch**, set branch to `main` and folder to `/docs`, then save.
- If you add a custom domain in the Pages settings, keep the generated `docs/CNAME` file committed.
- Any time you change content, rerun `npm run export` to refresh `docs/` before pushing.
### Notes
- Generated output is ignored (`next-app/.next/`, `next-app/node_modules/`). Build locally as needed.
