angular.module('mv.services', [])

    .factory('Login', function ($http) {

        var url = 'http://mv.local/app_dev.php/login';

        return {
            postLogin: function (data) {
                $http.post(url, data, {
                    headers: { 'Content-Type': 'application/json'}
                })
                    .success(function(data) {
                        return data;
                    })
                    .error(function(error) {
                        return error;
                    });

            },
            getCookies: function (friendId) {
                // Simple index lookup
                return friends[friendId];
            },
            isLogged: function() {

                return true;
            }

        }
    });
