angular.module('mv', ['ionic', 'mv.controllers', 'mv.services'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'template/home.html'
          })
          .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html'
          });
          //.state('tab.dash', {
          //  url: '/dash',
          //  views: {
          //    'tab-dash': {
          //      templateUrl: 'templates/tab-dash.html',
          //      controller: 'DashCtrl'
          //    }
          //  }
          //});
      $urlRouterProvider.otherwise('/');
    });

