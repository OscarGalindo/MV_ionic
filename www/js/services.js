angular.module('mv.services', [])

    .factory('MVRest', ['$http', function ($http) {

        var base = 'http://mv.local';
        var result = {};

        result.login = function(data) {
            return $http.post(base + '/login', data);
        }

        result.notifications = function(data) {
            return $http.post(base + '/getNotifications', data);
        }

        return result;
    }]);
