---
name: Express backend setup
description: Key decisions and constraints for the Express API server in this project
---

## Port selection
Replit only allows these ports for workflows: 3000, 3001, 3002, 3003, 4200, 5000, 5173, 6000, 6800, 8000, 8008, 8080, 8099, 9000
- API server runs on **port 8000** (console outputType)
- Frontend Vite dev server runs on **port 5000** (webview outputType)
- Vite proxies `/api` → `http://localhost:8000` in vite.config.ts

## tsconfig.server.json
- `"moduleResolution": "node"` triggers a deprecation error in TS 6 — add `"ignoreDeprecations": "6.0"` to silence it
- The frontend tsconfig uses `"moduleResolution": "bundler"` — the server needs its own `tsconfig.server.json`

## Express 5 typing quirk
In Express 5, `req.params.id` has type `string | string[]` (not `string`).
Always cast: `parseInt(String(req.params.id), 10)`

**Why:** The @types/express v5 types broadened params to allow arrays; without the cast tsc strict mode fails.

## Architecture
- `server/index.ts` — bootstrap: runs migrations then starts Express on port 8000
- `server/db.ts` — pg Pool, reads DATABASE_URL
- `server/migrate.ts` — idempotent DDL for gallery_images and opportunities tables
- `server/router.ts` — mounts /gallery and /opportunities under /api
- `server/modules/{gallery,opportunities}/` — model / service / routes per module
- `server/middleware/errorHandler.ts` — global error + 404 handler
- Workflow name: "API Server", command: `npm run server`
