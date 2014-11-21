angular.module('mv.services', [])

    .factory('MVRest', ['$http', function ($http) {

        var base = 'http://91.121.182.76/app.php';
        var result = {};

        result.login = function(data) {
            return $http.post(base + '/login', data);
        };

        result.notifications = function(data) {
            return $http.post(base + '/getNotifications', data);
        };

        result.logout = function(url) {
            return $http.post(base + '/logout', url);
        };

        return result;
    }])

    .factory('BusyService', ['$ionicLoading', function($ionicLoading) {
        return {
            show: function() {
                $ionicLoading.show({
                    content: '<h1><i class="icon ion-ios7-reloading"></i></h1>',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 93,
                    showDelay: 100
                });
            },
            hide: function() {
                $ionicLoading.hide();
            }
        };
    }]);
