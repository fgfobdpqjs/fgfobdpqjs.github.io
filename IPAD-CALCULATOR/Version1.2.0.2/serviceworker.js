/*
Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Choose a cache name
const cacheName = 'cache-v1.0.1';
// List the files to precache
const precacheResources = [
 '/IPAD-CALCULATOR/Version1.2.0.2/abouten.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/aboutzh-Hans.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/aboutzh-Hant.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/aboutja-jp.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/abouten.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/aboutzh-Hans.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/aboutzh-Hant.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/aboutja-jp.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/en.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-Hans.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-Hant.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/ja-jp.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/enWindows.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-HansWindows.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-HantWindows.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/ja-jpWindows.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/enWindows7.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-HansWindows7.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-HantWindows7.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/ja-jpWindows7.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/enAndroid.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-HansAndroid.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/zh-HantAndroid.html',
 '/IPAD-CALCULATOR/Version1.2.0.2/ja-jpAndroid.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/en.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-Hans.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-Hant.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/ja-jp.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/enWindows.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-HansWindows.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-HantWindows.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/ja-jpWindows.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/enWindows7.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-HansWindows7.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-HantWindows7.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/ja-jpWindows7.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/enAndroid.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-HansAndroid.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/zh-HantAndroid.html',
 'https://fgfobdpqjs.github.io/IPAD-CALCULATOR/Version1.2.0.2/ja-jpAndroid.html',
 'https://www.icloud.com/shortcuts/3d4c52d581ce40babb4d86e45d8a56ea',
 'https://www.icloud.com/shortcuts/99baa34c1d284e0d8e2146574c8b6cbe',
 'https://www.icloud.com/shortcuts/292d200a8bd14564ad1a9424fab9e9dd',
 'help.png',
 'love-circled.png',
 'play-button-circled--v1.png',
 '226;240;300;400.css',
 'cadc928b998b9ce31be75d6bffa0de65.png'
];

// When the service worker is installing, open the cache and add the precache resources to it
// self.addEventListener('install', (event) => {
//   console.log('ServiceWorker: Caching files:', precacheResources.length, precacheResources);
//   try {
//     event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
//   } catch (err) {
//     console.error('sw: cache.addAll');
//     for (let i of precacheResources) {
//         try {
//           event.waitUntil(caches.open(cacheName).then((cache) => cache.add(i)));
//         } catch (err) {
//           console.warn('sw: cache.add',i);
//         }
//       }
//   }
// });
/////
self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(async (cache) => {
    let ok,
    c = precacheResources;
   
    console.log('ServiceWorker: Caching files:', c.length, c);
    try {
      ok = await cache.addAll(c);
    } catch (err) {
      console.error('sw: cache.addAll');
      for (let i of c) {
        try {
          ok = await cache.add(i);
        } catch (err) {
          console.warn('sw: cache.add',i);
        }
      }
    }

    return ok;
  }));

  console.log('ServiceWorker installed');
});
/////



self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);

  if ( event.request.url.indexOf( 'googletagmanager' ) !== -1 ||  event.request.url.indexOf( 'google-analytics' ) !== -1 ) {
    console.log('Exiting for analytics request:', event.request.url);
    return false;
  }

  event.respondWith(
    fetch(event.request).then((response) => {
      const clonedResponse = response.clone(); // clone the response
      caches.open(cacheName).then((cache) => {
        cache.put(event.request, clonedResponse); // save the cloned response to the cache
      });
      return response; // return the original response
    }).catch(() => {
      return caches.match(event.request); // fallback to cache if network fails
    })
  );
});
