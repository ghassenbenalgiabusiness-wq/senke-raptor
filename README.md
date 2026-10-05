# Senke Raptor — Cloudflare D1
Cloudflare Worker + D1. The frontend is embedded in `worker.js`, so no `public/` folder is required for GitHub mobile upload.

## Deploy
1. Import this GitHub repository into Cloudflare Workers.
2. Deploy with `npx wrangler deploy`.
3. In Worker Settings → Bindings, add D1:
   - Variable name: `DB`
   - Database: `senke-raptor`
4. Test `/api/health`.
