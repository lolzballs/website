angular.module('app', ['ui.router', 'restangular', 'angularMoment', 'btford.markdown']).run(['$rootScope', '$state', '$stateParams', '$http', function ($rootScope, $state, $stateParams, $http) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.wait = true;
    $http.get('/api/auth').then(function(response) {
        $rootScope.authenticated = response.data;
        $rootScope.wait = false;
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.wait && toState.authenticate && !$rootScope.authenticated)) {
            $state.transitionTo(fromState.name == '' ? 'home.index' : fromState.name, fromParams);
            event.preventDefault();
        }
    });
}]).config(['$stateProvider', '$locationProvider', 'RestangularProvider', function ($stateProvider, $locationProvider, RestangularProvider) {
    $locationProvider.html5Mode(true);
    RestangularProvider.setBaseUrl('/api');

    $stateProvider.state('home', {
        abstract: true,
        views: {
            main: {
                templateUrl: '/templates/home.html'
            }
        }
    }).state('home.index', {
        url: '/',
        views: {
            posts: {
                templateUrl: '/templates/post.list.html',
                controller: 'PostListController'
            },
            categories: {
                templateUrl: '/templates/category.list.html',
                controller: 'CategoryListController'
            },
            tags: {
                templateUrl: '/templates/tag.list.html',
                controller: 'TagListController'
            }
        }
    }).state('auth', {
        abstract: true,
        views: {
            main: {
                templateUrl: '/templates/auth.html'
            }
        }
    }).state('auth.login', {
        url: '/auth/login',
        views: {
            auth: {
                templateUrl: '/templates/auth.login.html',
                controller: 'AuthLoginController'
            }
        }
    }).state('auth.logout', {
        url: '/auth/logout',
        views: {
            auth: {
                templateUrl: '/templates/auth.logout.html',
                controller: 'AuthLogoutController'
            }
        },
        authenticate: true
    }).state('post', {
        abstract: true,
        views: {
            main: {
                templateUrl: '/templates/post.html'
            }
        }
    }).state('post.index', {
        url: '/posts',
        views: {
            posts: {
                templateUrl: '/templates/post.list.html',
                controller: 'PostListController'
            }
        }
    }).state('post.create', {
        url: '/post/create',
        views: {
            posts: {
                templateUrl: '/templates/post.create.html',
                controller: 'PostCreateController'
            }
        },
        authenticate: true
    }).state('post.detail', {
        url: '/post/:id',
        views: {
            posts: {
                templateUrl: '/templates/post.detail.html',
                controller: 'PostDetailController'
            }
        }
    }).state('post.edit', {
        url: '/post/:id/edit',
        views: {
            posts: {
                templateUrl: '/templates/post.edit.html',
                controller: 'PostEditController'
            }
        },
        authenticate: true
    }).state('tag', {
        abstract: true,
        views: {
            main: {
                templateUrl: '/templates/tag.html'
            }
        }
    }).state('tag.index', {
        url: '/tags',
        views: {
            tags: {
                templateUrl: '/templates/tag.list.html',
                controller: 'TagListController'
            }
        }
    }).state('tag.create', {
        url: '/tag/create',
        views: {
            tags: {
                templateUrl: '/templates/tag.create.html',
                controller: 'TagCreateController'
            }
        },
        authenticate: true
    }).state('category', {
        abstract: true,
        views: {
            main: {
                templateUrl: '/templates/category.html'
            }
        }
    }).state('category.index', {
        url: '/categories',
        views: {
            categories: {
                templateUrl: '/templates/category.list.html',
                controller: 'CategoryListController'
            }
        }
    }).state('category.create', {
        url: '/category/create',
        views: {
            categories: {
                templateUrl: '/templates/category.create.html',
                controller: 'CategoryCreateController'
            }
        },
        authenticate: true
    });
}]).constant('angularMomentConfig', {
    timezone: moment.tz.guess()
}).filter('localTime', function () {
    return function (time) {
        return moment.utc(time).local();
    }
});