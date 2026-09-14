const CACHE="mzansi-learner-driver-r3-r5-consolidated";
const ASSETS=["./","./index.html","./style.css","./i18n.js","./app.js","./manifest.json","./icons/mzansi-learner.svg","./icons/icon-192.png","./icons/icon-512.png","./data/questions/rules.json","./data/questions/signs.json","./data/questions/controls.json","./data/questions/motorcycle.json"];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;

  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  // When online, prefer the newest app/content files.
  // If the network is unavailable, fall back immediately to the offline cache.
  event.respondWith(
    fetch(event.request)
      .then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        return response;
      })
      .catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html")))
  );
});