angular.module('mv.controllers', ['mv.services', 'ionic.utils'])
    .controller('indexCtrl', function($rootScope, $scope, $state, $location, $ionicLoading, $timeout, MVRest, $localstorage) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $timeout(function () {
            $ionicLoading.hide();

            user_data = $localstorage.getObject('user_data');
            if(user_data.result === true) {
                $state.go('home');
                return;
            }
            $state.go('login');
        }, 2000);
    })

    .controller('HomeCtrl', function($rootScope, $scope, $state, $stateParams, MVRest, $ionicLoading, $localstorage, $timeout) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        $timeout(function () {
            $ionicLoading.hide();
            user_data = $localstorage.getObject('user_data');
            $scope.nickname = user_data.nickname;

            MVRest.notifications(user_data.cookies)
                .success(function(data) {
                    $scope.notifications = data;
                });
        }, 1000);
    })
    .controller('loginCtrl', function($rootScope, $scope, $state, $stateParams, MVRest, $ionicLoading, $localstorage) {
        $scope.doLogin = function() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            var data = {
                username: this.username,
                password: this.password,
                cookie: 1
            };

            MVRest.login(data)
                .success(function(data) {
                    $rootScope.data = data;
                    if(data.result) {
                        $ionicLoading.hide();
                        $localstorage.setObject('user_data', data);
                        $state.go('home');
                    } else {
                        console.error('Error al loguearse');
                        $state.go('login');
                    }
                });
        }
    })
    .controller('logoutCtrl', function($rootScope, $scope, $state, $location, $ionicLoading, $timeout, MVRest, $localstorage) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $timeout(function () {
            $ionicLoading.hide();
            user_data = $localstorage.getObject('user_data');
            MVRest.logout(user_data.logout_url)
                .then(function() {
                    user_data = $localstorage.setObject('user_data', {result: false});
                    $state.go('login');
                });
        }, 2000);
    })
;