angular.module('mv.controllers', ['mv.services'])

.controller('HomeCtrl', function($rootScope, $scope, $state) {
    if(!$rootScope.islogged) {
        $state.go('login');
    }

})

.controller('LoginCtrl', function($rootScope, $scope, $state, Login) {
        $scope.doLogin = function() {
            var data = {
                username: $scope.username,
                password: $scope.password,
                cookie: 1
            };
            $rootScope.data = Login.postLogin(data);
            console.log($rootScope.data);
        }
});