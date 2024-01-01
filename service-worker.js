const CACHE_NAME = "panting";
let urlsToCache = [
  "/",
  "/index.html",
  "/credit.html",
  "/petunjuk.html",
  "/pages/feature-a/index.html",
  "/pages/feature-a/0/index.html",
  "/pages/feature-a/1/index.html",
  "/pages/feature-a/2/index.html",
  "/pages/feature-a/3/index.html",
  "/pages/feature-a/4/index.html",
  "/pages/feature-a/5/index.html",
  "/pages/feature-a/6/index.html",
  "/pages/feature-a/7/index.html",
  "/pages/feature-b/index.html",
  "/pages/feature-b/0/index.html",
  "/pages/feature-b/0/script.js",
  "/pages/feature-b/1/index.html",
  "/pages/feature-b/1/script.js",
  "/pages/feature-b/2/index.html",
  "/pages/feature-b/2/script.js",
  "/pages/feature-b/3/index.html",
  "/pages/feature-b/3/script.js",
  "/pages/feature-c/index.html",
  "/pages/feature-c/0/index.html",
  "/pages/feature-c/0/script.js",
  "/pages/feature-c/1/index.html",
  "/pages/feature-c/1/script.js",
  "/pages/feature-c/2/index.html",
  "/pages/feature-c/2/script.js",
  "/pages/feature-c/3/index.html",
  "/pages/feature-c/3/script.js",
  "/pages/feature-c/4/index.html",
  "/pages/feature-c/4/script.js",
  "/pages/feature-c/5/index.html",
  "/pages/feature-c/5/script.js",
  "/pages/feature-c/6/index.html",
  "/pages/feature-c/6/script.js",
  "/pages/feature-c/7/index.html",
  "/pages/feature-c/7/script.js",
  "/pages/feature-c/8/index.html",
  "/pages/feature-c/8/script.js",
  "/pages/feature-c/9/index.html",
  "/pages/feature-c/9/script.js",
  "/assets/css/style.css",
  "/assets/img/babun.png",
  "/assets/img/bass.png",
  "/assets/img/biola.png",
  "/assets/img/gong.png",
  "/assets/img/musik-panting.png",
  "/assets/img/panting.jpg",
  "/assets/img/panting.png",
  "/assets/img/tamborin.png",
  "/assets/img/vokal.png",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache)
    }),
  );
});

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches
    .match(event.request, { cacheName : CACHE_NAME })
    .then(function(response){
      if(response) {
        // console.log("ServiceWorker : Gunakan asset dari cache : ", response.url)
        return response;
      }

        // console.log("ServiceWorker : Memuat asset dari server : ", event.request.url)
      return fetch(event.request);
    }),
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.map(function(cacheName){
          if(cacheName != CACHE_NAME) {
            console.log("ServiceWorker : cache"+ cacheName +"dihapus")
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})