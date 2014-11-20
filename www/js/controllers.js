angular.module('mv.controllers', ['mv.services'])
    .controller('HomeCtrl', function($rootScope, $scope, $state, $location, $ionicLoading, $timeout, MVRest) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $timeout(function () {
            $ionicLoading.hide();
            if(typeof($rootScope.isLogged) == 'undefined' || !$rootScope.isLogged) {
                $state.go('login');
                return;
            }
            $scope.nickname = $rootScope.data.nickname;

            MVRest.notifications($rootScope.data.cookies)
                .success(function(data) {
                    $scope.notifications = data;
                });
        }, 1000);
        // TEST
        // ----
        //$scope.notifications = {
        //    avs: 0,
        //    msj: 3,
        //    fav: 0
        //};
        //$scope.nickname = 'kaseOga';
    })

    .controller('LoginCtrl', function($rootScope, $scope, $state, $stateParams, MVRest) {
        $scope.doLogin = function() {
            var data = {
                username: this.username,
                password: this.password,
                cookie: 1
            };
            MVRest.login(data)
                .success(function(data) {
                    $rootScope.data = data;
                    if(data.result) {
                        $rootScope.isLogged = true;
                        $state.go('home');
                    } else {
                        console.error('Error al loguearse');
                        $state.go('login');
                    }
                });
        }
    });