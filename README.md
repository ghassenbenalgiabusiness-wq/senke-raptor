# Senke Raptor V7

Premium Cloudflare Worker + D1 motorcycle ride control web app.

## Features
- Professional responsive sidebar UI
- Tunisia map with first click = departure, second = destination
- Immediate route preview + fast routing with fallback (never stuck on Calcul...)
- Fuel/price/range calculations
- Trip history and visited places
- Motorcycle maintenance checklist and history
- Cloudflare D1 binding: `DB` -> database `senke-raptor`

## Deploy
Use Cloudflare Workers Builds with `npx wrangler deploy`. Keep the Production D1 binding named `DB`.
