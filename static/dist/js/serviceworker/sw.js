

// import the library
importScripts('/static/dist/js/sw/sw-toolbox.js');
//Add Critical Resources to cache
toolbox.precache([
    '/',
    '/about',
    '/contact',
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
    '/static/plugins/fastclick/fastclick.min.js'
    ]);
toolbox.router.default = toolbox.cacheFirst;
//Routers
toolbox.router.get('/.*', toolbox.cacheFirst);
