self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // GitHub Pages上で、SWF内部が /swf-game/sub/xxx.swf を要求したら
  // 実際にアップ済みの /swf-game/xxx.swf を読ませる。
  if (url.pathname.includes('/sub/')) {
    const fixedPath = url.pathname.replace('/sub/', '/');
    const fixedUrl = new URL(url.origin + fixedPath);
    event.respondWith(fetch(fixedUrl, { cache: 'no-store' }));
    return;
  }

  event.respondWith(fetch(event.request));
});
