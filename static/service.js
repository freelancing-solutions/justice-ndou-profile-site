// import the library
importScripts('/static/sw/sw-toolbox.js');
//Add Critical Resources to cache
toolbox.precache([
    '/',

    '/static/dist/favicons/apple-icon-57x57.png',
    '/static/dist/favicons/apple-icon-60x60.png',
    '/static/dist/favicons/apple-icon-72x72.png',
    '/static/dist/favicons/apple-icon-76x76.png',
    '/static/dist/favicons/apple-icon-114x114.png',
    '/static/dist/favicons/apple-icon-120x120.png',
    '/static/dist/favicons/apple-icon-144x144.png',
    '/static/dist/favicons/apple-icon-152x152.png',
    '/static/dist/favicons/apple-icon-180x180.png',
    '/static/dist/favicons/android-icon-192x192.png',
    '/static/dist/favicons/favicon-32x32.png',
    '/static/dist/favicons/favicon-96x96.png',
    '/static/dist/favicons/favicon-16x16.png',
    '/static/dist/favicons/ms-icon-144x144.png',
    '/static/dist/manifest/manifest.json',

    '/static/bootstrap/css/bootstrap.min.css',
    '/static/dist/css/AdminLTE.min.css',
    '/static/dist/css/skins/skin-blue.min.css',
    '/static/dist/css/font-awesome.min.css',
    '/static/dist/css/ionicons.min.css',
    '/static/dist/css/AdminLTE.min.css',
    '/static/dist/css/skins/skin-blue.min.css',
    '/static/plugins/datatables/dataTables.bootstrap.css',
    'static/plugins/datepicker/datepicker3.css',
    '/static/plugins/timepicker/bootstrap-timepicker.min.css',
    '/static/plugins/bootstrap-slider/slider.css',
    '/static/plugins/ionslider/ion.rangeSlider.skinNice.css',
    '/static/plugins/ionslider/ion.rangeSlider.css',
    '/static/plugins/select2/select2.min.css',
    '/static/plugins/daterangepicker/daterangepicker.css',
    '/static/dist/css/slider.css',


    '/static/plugins/jQuery/jquery-2.2.3.min.js',
    '/static/bootstrap/js/bootstrap.min.js',
    '/static/plugins/slimScroll/jquery.slimscroll.min.js',
    '/static/plugins/fastclick/fastclick.min.js',
    '/static/plugins/datatables/dataTables.bootstrap.min.js',
    '/static/plugins/datatables/jquery.dataTables.min.js',
    '/static/plugins/datepicker/bootstrap-datepicker.js',
    '/static/plugins/timepicker/bootstrap-timepicker.min.js',
    '/static/plugins/chartjs/Chart.min.js',
    '/static/dist/js/tinymce/js/tinymce/tinymce.min.js',
    '/static/plugins/bootstrap-slider/bootstrap-slider.js',
    '/static/plugins/ionslider/ion.rangeSlider.min.js',
    '/static/dist/js/moment.min.js',
    '/static/plugins/select2/select2.full.min.js',
    '/static/plugins/daterangepicker/daterangepicker.js',
    '/static/plugins/iCheck/icheck.min.js',



    '/static/dist/js/social/jquery.floating-social-share.min.js'
    ]);

toolbox.router.default = toolbox.cacheFirst;

//Routers
toolbox.router.get('/',toolbox.cacheFirst);
toolbox.router.get('/navigation/header', toolbox.cacheFirst);
toolbox.router.get('/navigation/sidebar', toolbox.cacheFirst);
toolbox.router.get('/navigation/footer', toolbox.cacheFirst);
toolbox.router.get('/static/.*', toolbox.cacheFirst);
toolbox.router.get('/.*', toolbox.cacheFirst);
