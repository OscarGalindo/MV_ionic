angular.module('mv', ['ionic', 'mv.controllers'])
    .run(function ($ionicPlatform, $rootScope, $state) {
        $rootScope.$state = $state;
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                controller: 'indexCtrl',
                templateUrl: 'templates/index.html'
            })
            .state('home', {
                url: '/home',
                controller: 'HomeCtrl',
                templateUrl: 'templates/home.html'
            })
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                templateUrl: 'templates/login.html'
            })
            .state('logout', {
                url: '/logout',
                controller: 'logoutCtrl',
                templateUrl: 'templates/logout.html'
            })
            .state('forums', {
                url: '/forums',
                controller: 'forumsCtrl',
                templateUrl: 'templates/forums.html'
            })
            .state('forum', {
                url: '/forum/:slug',
                controller: 'forumCtrl',
                templateUrl: 'templates/forum.html'
            });
        $urlRouterProvider.otherwise('/');
    });

