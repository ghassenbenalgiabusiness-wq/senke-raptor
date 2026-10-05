# Senke Raptor V5 — Map + Entretien

- Carte Tunisie avec Leaflet/OpenStreetMap
- 1er clic = départ, 2e clic = destination
- Route et distance automatiques
- Calcul carburant/coût selon 14 L et 3.2 L/100 km
- Historique trajets et lieux visités dans D1
- Entretien : vidange, chaîne, freins, pneus, filtre, bougie, batterie, kit chaîne
- Chaque « fait » est enregistré dans l'historique D1
- Binding Cloudflare : `DB` → `senke-raptor`
- Pas de Supabase / Neon / Lovable


### V6 routing
- Robust routing: OSRM primary, OpenStreetMap routing fallback, then straight-line fallback if both routers are unavailable.
- Route requests have timeouts so the UI never stays indefinitely on Calcul.
- Added visited places history.
