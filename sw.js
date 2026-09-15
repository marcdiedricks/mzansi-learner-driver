const CACHE="mzansi-learner-driver-natis-audit-r10";
const ASSETS=["./","./index.html","./style.css","./i18n.js","./app.js","./manifest.json","./icons/mzansi-learner.svg","./icons/icon-192.png","./icons/icon-512.png","./data/questions/rules.json","./data/questions/signs.json","./data/questions/controls.json","./data/questions/motorcycle.json","./data/questions/completion-rules.json","./data/questions/completion-signs.json","./data/questions/completion-controls.json","./data/knowledge/rules-remediation-r1.json","./data/knowledge/sign-visual-map-r1.json","./assets/signs/stop.svg","./assets/signs/yield.svg","./assets/signs/no-entry.svg","./assets/signs/speed-limit-60.svg","./assets/signs/keep-left.svg","./assets/signs/no-u-turn.svg","./assets/signs/children-warning.svg","./assets/signs/traffic-circle-warning.svg","./assets/signs/pedestrian-crossing-warning.svg","./assets/signs/slippery-road-warning.svg","./assets/signs/railway-crossing-warning.svg","./data/knowledge/signs-remediation-r1.json","./assets/signs/minimum-speed-40.svg","./assets/signs/keep-right.svg","./assets/signs/proceed-right-only.svg","./assets/signs/pedestrians-only.svg","./assets/signs/cyclists-only.svg","./assets/markings/railway-crossing-ahead-wm1.svg","./assets/markings/continuity-lines-wm2.svg","./assets/markings/dividing-lines-wm3.svg","./assets/markings/reversible-lane-lines-wm4.svg","./assets/signs/height-limit.svg","./assets/signs/length-limit.svg","./assets/signs/excessive-noise-prohibited.svg","./assets/signs/hitchhiking-prohibited.svg","./assets/signs/unauthorised-vehicles-prohibited.svg","./assets/signs/left-turn-ahead-prohibited.svg","./assets/signs/right-turn-ahead-prohibited.svg","./assets/signs/overtaking-prohibited.svg","./assets/signs/freeway-pre-advance-exit.svg","./assets/signs/freeway-advance-exit.svg","./assets/signs/freeway-supplementary-exit.svg","./assets/signs/freeway-exit-direction.svg","./assets/signs/freeway-gore-exit.svg","./assets/signs/off-ramp-advance-terminal.svg","./assets/signs/off-ramp-terminal.svg","./assets/signs/temporary-sign-concept.svg","./assets/signs/bus-reservation.svg","./assets/signs/bus-lane-reservation.svg","./assets/signs/cycle-reservation.svg","./assets/signs/parking-reservation.svg","./assets/signs/motorcycle-reservation.svg","./assets/signs/secondary-time-periods.svg","./assets/signs/secondary-reduced-visibility.svg","./assets/signs/secondary-daytime.svg","./assets/signs/secondary-night.svg","./assets/signs/pay-and-display.svg","./assets/signs/freeway-begins-dual.svg","./assets/signs/freeway-begins-single.svg","./assets/signs/woonerf.svg","./assets/signs/de-restriction.svg","./assets/signs/countdown-exit.svg","./assets/signs/right-of-way-info.svg","./assets/signs/park-and-ride.svg","./assets/signs/information-centre.svg","./assets/signs/coordinated-signals.svg","./assets/markings/lane-reduction-wm6.svg","./assets/markings/mandatory-direction-ahead-wm7.svg","./assets/markings/prohibition-line-ahead-wm8.svg","./assets/markings/speed-hump-wm10.svg","./assets/markings/guide-lines-gm2.svg","./assets/markings/bifurcation-gm3.svg","./assets/signals/flashing-red-left.svg","./assets/signals/amber-arrow.svg","./assets/signals/green-arrow.svg","./assets/signals/flashing-amber.svg","./data/knowledge/controls-remediation-r1.json","./assets/signs/route-marker-national.svg","./assets/signs/route-marker-provincial.svg","./assets/signs/route-marker-regional.svg","./assets/signs/route-marker-metro.svg","./assets/signs/guidance-location.svg","./assets/signs/guidance-direction.svg","./assets/signs/guidance-tourism-services.svg","./assets/signs/diagrammatic-lanes.svg","./assets/signs/variable-message.svg","./data/knowledge/control-visual-map-r1.json","./assets/controls/code1-control-map.svg","./assets/controls/code2-control-map.svg","./assets/markings/markings-reference-board.svg","./assets/signs/sign-concepts-reference-board.svg"];

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