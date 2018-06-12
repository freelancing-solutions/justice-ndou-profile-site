
const staticAssets = [
    '/',
    '/about',
    '/contact',
    '/profiles/software-projects',
    '/profiles/linkedin',
    '/blog/programming',
    '/blog/science',
    '/blog/philosophy',
    '/blog/mathematics',
    '/social/facebook',
    '/social/google',
    '/social/twitter',
    '/social/youtube',
    '/navigation/header',
    '/navigation/sidebar',
    '/navigation/footer',
    '/static/dist/js/app.min.js',
    '/static/dist/js/firebase.js',
    '/static/dist/js/firebaseui.js',
    '/static/dist/js/pages/accounts.js',
    '/static/dist/js/pages/contacts.js',
    '/static/dist/js/pages/index.js',
    '/static/dist/js/pages/loaders.js',
    '/static/dist/js/pages/authentication/header.js',
    '/static/dist/js/pages/authentication/sidebar.js',
    '/static/dist/js/pages/authentication/login.js',
    '/static/dist/js/pages/authentication/signout.js',
    '/static/dist/js/pages/contact/contacts.js',
    '/static/dist/js/pages/contact/tickets.js',
    '/static/bootstrap/css/bootstrap.min.css',
    '/static/dist/css/font-awesome.min.css',
    '/static/dist/css/ionicons.min.css',
    '/static/dist/css/AdminLTE.min.css',
    '/static/dist/css/skins/skin-blue.min.css',
    '/static/dist/css/blog.css',
    '/static/plugins/jQuery/jquery-2.2.3.min.js',
    '/static/bootstrap/js/bootstrap.min.js',
    '/static/plugins/slimScroll/jquery.slimscroll.min.js',
    '/static/plugins/fastclick/fastclick.min.js',
];

self.addEventListener('install', async event => {
    event.waitUntil(
        caches.open('justice-ndou').then(cache =>{
            return cache.addAll(staticAssets);
        }).then(() => {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url  = new URL(req.url);
    if (url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function  networkFirst(req) {
 const cache = await caches.open('justice-ndou');

 try {
     const res = await fetch(req);
     cache.put(req,res.clone());
     return res;
 }catch (error){
     return await cache.match(req);
 }
}