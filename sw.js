const VERSION = "20260510-subfix-1";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // GitHub Pages上で /swf-game/sub/xxx.swf を /swf-game/xxx.swf に読み替える
  if (url.pathname.includes("/swf-game/sub/")) {
    const file = url.pathname.split("/").pop();
    const mapped = new URL("/swf-game/" + file + "?v=" + VERSION, self.location.origin);
    event.respondWith(fetch(mapped, { cache: "reload" }));
    return;
  }

  // SWFはなるべく最新を取りに行く
  if (url.pathname.endsWith(".swf")) {
    event.respondWith(fetch(event.request, { cache: "reload" }));
    return;
  }
});
