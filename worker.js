const HTML="<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"theme-color\" content=\"#080a0e\"><title>Senke Raptor</title><link rel=\"stylesheet\" href=\"/style.css\"></head><body><header><b>\ud83c\udfcd\ufe0f SENKE RAPTOR</b><span>\u2601\ufe0f CLOUDFLARE</span></header><main><section class=\"hero\"><div><small>PREMIUM RIDE PLANNER</small><h1>Planifie ton trajet<br><em>sans surprise.</em></h1><p>Trajets et param\u00e8tres enregistr\u00e9s dans Cloudflare D1.</p></div><div class=\"range\"><small>Autonomie</small><strong id=\"range\">437.5 km</strong><span>14 L \u2022 3.2 L/100 km</span></div></section><section class=\"grid\"><article class=\"card\"><h2>\ud83d\udccd Nouveau trajet</h2><label>D\u00e9part<input id=\"from\" value=\"Tunis\"></label><label>Destination<input id=\"to\" value=\"Hammamet\"></label><label>Distance (km)<input id=\"distance\" type=\"number\" value=\"65\"></label><label class=\"check\"><input id=\"round\" type=\"checkbox\"> Aller-retour</label><button id=\"save\">\uff0b Enregistrer dans Cloudflare</button><p id=\"msg\"></p></article><article class=\"card\"><h2>\ud83d\udcca R\u00e9sultat</h2><div class=\"line\">Distance <b id=\"od\">65 km</b></div><div class=\"line\">Carburant <b id=\"of\">2.08 L</b></div><div class=\"line\">Co\u00fbt <b id=\"oc\">5.25 DT</b></div><div class=\"line\">Restant <b id=\"or\">11.92 L</b></div></article><article class=\"card\"><h2>\u2699\ufe0f Ma Raptor</h2><label>R\u00e9servoir<input id=\"tank\" type=\"number\" value=\"14\" step=\".1\"></label><label>Consommation<input id=\"cons\" type=\"number\" value=\"3.2\" step=\".1\"></label><label>Prix carburant<input id=\"price\" type=\"number\" value=\"2.525\" step=\".001\"></label><button id=\"settings\">\u2601\ufe0f Sauvegarder</button></article></section><section class=\"card history\"><h2>\ud83d\udd58 Historique Cloudflare</h2><button id=\"refresh\">Actualiser</button><div id=\"history\">Chargement...</div></section><section class=\"card status\">D1: <b id=\"status\">connexion...</b></section></main><script src=\"/app.js\"></script></body></html>";
const CSS="*{box-sizing:border-box}body{margin:0;background:#080a0e;color:#f5f6f8;font-family:system-ui,-apple-system,sans-serif}header{height:70px;display:flex;justify-content:space-between;align-items:center;padding:0 6%;border-bottom:1px solid #292d34;background:#0b0d11;position:sticky;top:0}header b,em,small,.line b{color:#ff5b3d}header span{font-size:11px;color:#ff765d;border:1px solid #4a2821;padding:8px 12px;border-radius:999px}main{max-width:1180px;margin:auto;padding:48px 20px}.hero{display:flex;justify-content:space-between;gap:25px;align-items:end;margin-bottom:25px}.hero small{font-weight:800;letter-spacing:2px}.hero h1{font-size:clamp(40px,7vw,70px);line-height:.98;margin:12px 0}.hero em{font-style:normal}.hero p{color:#9ba1aa}.range,.card{background:linear-gradient(145deg,#14171c,#0e1014);border:1px solid #2a2e35;border-radius:22px;padding:22px}.range{min-width:245px}.range small,.range span{display:block;color:#9299a2}.range strong{display:block;font-size:38px;margin:8px 0}.grid{display:grid;grid-template-columns:1.15fr .9fr .9fr;gap:16px}.card h2{font-size:18px;margin:0 0 18px}label{display:block;color:#aab0b8;font-size:12px;margin:13px 0}input{width:100%;margin-top:7px;background:#080a0e;color:white;border:1px solid #343941;border-radius:11px;padding:12px}.check{display:flex;gap:8px;align-items:center}.check input{width:auto;margin:0}button{width:100%;border:0;border-radius:12px;padding:13px;background:linear-gradient(90deg,#ff4b2b,#ff7047);color:#fff;font-weight:800}.line{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #292d33}.history,.status{margin-top:16px}.history button{margin-bottom:12px}.trip{display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:8px;padding:13px 0;border-top:1px solid #272b31}.trip small{display:block;color:#777f89;margin-top:3px}.del{width:auto;background:#292d34}.status{display:flex;justify-content:space-between}@media(max-width:900px){.hero{display:block}.range{margin-top:18px}.grid{grid-template-columns:1fr}.trip{grid-template-columns:1fr 1fr}.status{display:block}}";
const JS="const $=x=>document.getElementById(x);let c={tank:14,cons:3.2,price:2.525};\nfunction calc(){let x=+$(\"distance\").value||0,d=$(\"round\").checked?x*2:x,f=d*c.cons/100;$(\"od\").textContent=d.toFixed(1)+\" km\";$(\"of\").textContent=f.toFixed(2)+\" L\";$(\"oc\").textContent=(f*c.price).toFixed(2)+\" DT\";$(\"or\").textContent=Math.max(0,c.tank-f).toFixed(2)+\" L\";$(\"range\").textContent=(c.tank/c.cons*100).toFixed(1)+\" km\"}\nasync function settings(){c={tank:+$(\"tank\").value||14,cons:+$(\"cons\").value||3.2,price:+$(\"price\").value||2.525};await fetch(\"/api/settings\",{method:\"PUT\",headers:{\"content-type\":\"application/json\"},body:JSON.stringify({tank_l:c.tank,consumption_l100:c.cons,fuel_price:c.price})});calc();$(\"msg\").textContent=\"Param\u00e8tres sauvegard\u00e9s \u2713\"}\nasync function save(){calc();let x=+$(\"distance\").value||0,d=$(\"round\").checked?x*2:x,f=d*c.cons/100;let r=await fetch(\"/api/trips\",{method:\"POST\",headers:{\"content-type\":\"application/json\"},body:JSON.stringify({departure:$(\"from\").value,destination:$(\"to\").value,distance_km:d,fuel_l:f,fuel_cost:f*c.price,round_trip:$(\"round\").checked})});$(\"msg\").textContent=r.ok?\"Trajet enregistr\u00e9 dans D1 \u2713\":\"Erreur API\";if(r.ok)load()}\nasync function load(){let a=await (await fetch(\"/api/trips\")).json();$(\"history\").innerHTML=a.length?a.map(x=>`<div class=\"trip\"><div><b>${x.departure} \u2192 ${x.destination}</b><small>${x.created_at}</small></div><div>${(+x.distance_km).toFixed(1)} km</div><div>${(+x.fuel_l).toFixed(2)} L</div><div>${(+x.fuel_cost).toFixed(2)} DT</div><button class=\"del\" onclick=\"del(${x.id})\">\u00d7</button></div>`).join(\"\"):\"<p>Aucun trajet.</p>\"}\nasync function del(id){await fetch(\"/api/trips/\"+id,{method:\"DELETE\"});load()}\nasync function boot(){try{let x=await(await fetch(\"/api/health\")).json();$(\"status\").textContent=x.database?\"connect\u00e9 \u2713\":\"D1 non li\u00e9\"}catch{$(\"status\").textContent=\"API non disponible\"}let x=await(await fetch(\"/api/settings\")).json();c={tank:+x.tank_l,cons:+x.consumption_l100,price:+x.fuel_price};$(\"tank\").value=c.tank;$(\"cons\").value=c.cons;$(\"price\").value=c.price;calc();load()}\n$(\"distance\").oninput=calc;$(\"round\").onchange=calc;$(\"save\").onclick=save;$(\"settings\").onclick=settings;$(\"refresh\").onclick=load;boot();\n";

export default {
  async fetch(request, env) {
    const u=new URL(request.url), p=u.pathname;

    if(p==="/api/health") return j({ok:true,service:"Senke Raptor API",database:!!env.DB});

    if(p==="/api/settings"){
      if(request.method==="GET"){
        let x=await env.DB.prepare("SELECT * FROM bike_settings WHERE id=?").bind("default").first();
        return j(x||{id:"default",tank_l:14,consumption_l100:3.2,fuel_price:2.525});
      }
      if(request.method==="PUT"){
        let x=await request.json();
        await env.DB.prepare("INSERT INTO bike_settings(id,tank_l,consumption_l100,fuel_price,updated_at) VALUES('default',?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET tank_l=excluded.tank_l,consumption_l100=excluded.consumption_l100,fuel_price=excluded.fuel_price,updated_at=CURRENT_TIMESTAMP").bind(+x.tank_l,+x.consumption_l100,+x.fuel_price).run();
        return j({ok:true});
      }
    }

    if(p==="/api/trips"){
      if(request.method==="GET"){
        let r=await env.DB.prepare("SELECT * FROM trips ORDER BY datetime(created_at) DESC,id DESC LIMIT 200").all();
        return j(r.results||[]);
      }
      if(request.method==="POST"){
        let x=await request.json();
        if(!x.departure||!x.destination) return j({error:"Départ et destination requis"},400);
        let r=await env.DB.prepare("INSERT INTO trips(departure,destination,distance_km,fuel_l,fuel_cost,round_trip) VALUES(?,?,?,?,?,?)").bind(String(x.departure),String(x.destination),+x.distance_km,+x.fuel_l,+x.fuel_cost,x.round_trip?1:0).run();
        return j({ok:true,id:r.meta?.last_row_id});
      }
    }

    let m=p.match(/^\/api\/trips\/(\d+)$/);
    if(m&&request.method==="DELETE"){
      await env.DB.prepare("DELETE FROM trips WHERE id=?").bind(+m[1]).run();
      return j({ok:true});
    }

    if(p==="/style.css") return new Response(CSS,{headers:{"content-type":"text/css; charset=utf-8"}});
    if(p==="/app.js") return new Response(JS,{headers:{"content-type":"application/javascript; charset=utf-8"}});
    if(p.startsWith("/api/")) return j({error:"API route not found"},404);
    return new Response(HTML,{headers:{"content-type":"text/html; charset=utf-8"}});
  }
};

function j(x,s=200){return new Response(JSON.stringify(x),{status:s,headers:{"content-type":"application/json","cache-control":"no-store"}})}
