var app = angular.module('StopAlarm', ['ui.router', 'BusCtrls']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/404');
        // $httpProvider.interceptors.push('AuthInterceptor');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            })
            .state('allStops', {
                url: '/stops',
                templateUrl: 'views/allStops.html',
                controller: 'AllStopsCtrl'
            })
            .state('stopShow', {
                url: '/stops/:id',
                templateUrl: 'views/stopShow.html',
                controller: 'ShowCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/userSignup.html',
                controller: 'SignupCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/userLogin.html',
                controller: 'LoginCtrl'
            })
            .state('404', {
                url: '/404',
                templateURL: 'app/views/404.html'
            });
        $locationProvider.html5Mode(true);
    }
]);
