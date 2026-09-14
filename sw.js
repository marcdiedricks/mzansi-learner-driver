const CACHE="mzansi-learner-driver-v0.1d-b-01";
const ASSETS=["./","./index.html","./style.css","./i18n.js","./app.js","./manifest.json","./icons/mzansi-learner.svg","./icons/icon-192.png","./icons/icon-512.png","./data/questions/rules.json","./data/questions/signs.json","./data/questions/controls.json"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match("./index.html"))));
});