angular.module('mv.controllers', ['mv.services', 'ionic.utils'])
    .controller('indexCtrl', function($rootScope, $scope, $state, $location, BusyService, $timeout, MVRest, $localstorage) {
        BusyService.show();
        $timeout(function () {
            BusyService.hide();

            user_data = $localstorage.getObject('user_data');
            if(user_data.result === true) {
                $state.go('home');
                return;
            }
            $state.go('login');
        }, 2000);
    })
    .controller('HomeCtrl', function($rootScope, $scope, $state, $stateParams, MVRest, BusyService, $localstorage) {
        BusyService.show();
        user_data = $localstorage.getObject('user_data');
        if(user_data.result === false) {
            BusyService.hide();
            $state.go('login');
        }
        $scope.nickname = user_data.nickname;

        MVRest.notifications(user_data.cookies)
            .success(function(data) {
                if(data.error) {
                    user_data = $localstorage.setObject('user_data', {result: false});
                    $state.go('login');
                }
                $scope.notifications = data;
            })
            .finally(function() {
                BusyService.hide();
            }
        );
    })
    .controller('loginCtrl', function($rootScope, $scope, $state, $stateParams, MVRest, BusyService, $localstorage) {
        $scope.doLogin = function() {
            BusyService.show();
            var data = {
                username: this.username,
                password: this.password,
                cookie: 1
            };

            MVRest.login(data)
                .success(function(data) {
                    $rootScope.data = data;
                    if(data.result) {
                        $localstorage.setObject('user_data', data);
                        $state.go('home');
                    } else {
                        console.error('Error al loguearse');
                        $state.go('login');
                    }
                })
                .finally(function() {
                    BusyService.hide();
                }
            );
        }
    })
    .controller('logoutCtrl', function($rootScope, $scope, $state, BusyService, MVRest, $localstorage) {
        BusyService.show();
        user_data = $localstorage.getObject('user_data');
        MVRest.logout(user_data.logout_url)
            .then(function() {
                user_data = $localstorage.setObject('user_data', {result: false});
            })
            .finally(function() {
                BusyService.hide();
                $state.go('login');
            }
        );
    })
    .controller('forumsCtrl', function($scope, $state, BusyService, MVRest, $localstorage) {
        BusyService.show();

        user_data = $localstorage.getObject('user_data');
        if(user_data.result === false) {
            BusyService.hide();
            $state.go('login');
        }

        $scope.loadForum = function(slug) {
            $state.go('forum', {slug: slug});
        };

        MVRest.getforums()
            .then(function(data) {
                $scope.forums = data.data;
            })
            .finally(function() {
                BusyService.hide();
            });
    })
    .controller('forumCtrl', function($scope, BusyService, MVRest, $stateParams, $state) {
        BusyService.show();

        $scope.loadPost = function(slug_forum, slug_post) {
            $state.go('post', {slug_forum: slug_forum, slug_post: slug_post});
        };

        $scope.slug_forum = $stateParams.slug;
        MVRest.getTopics($scope.slug_forum)
            .success(function(data) {
                $scope.topics = data;
            })
            .finally(function() {
                BusyService.hide();
            });
    })
    .controller('postCtrl', function($scope, BusyService, MVRest, $stateParams) {
        BusyService.show();
        MVRest.getPost($stateParams.slug_forum, $stateParams.slug_post)
            .success(function(data) {
                $scope.posts = data;
            })
            .finally(function() {
                BusyService.hide();
            });
    });