angular.module('BusCtrls', ['BusServices'])
    .controller('WelcomeCtrl', ['$scope', function($scope) {

    }])
    .controller('AllStopsCtrl', ['$scope', 'BusStop', function($scope, BusStop) {
        BusStop.showAllStops().then(function(res) {
            var stopsFiltered = res.data.filter(function(stop) {

                return stop.stop_name.includes('Pine');
            });
            $scope.stops = stopsFiltered;
            console.log(stopsFiltered.length);
        }).catch(function(res) {
            $scope.stops = res;
        });
    }])
    .controller('ShowCtrl', ['$scope', function($scope) {

    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                $http.post('/api/auth', $scope.user).then(function success(res) {
                    Auth.saveToken(res.data.token);
                    console.log('Token:', res.data.token);
                    $location.path('/');
                }, function error(res) {
                    console.log(res);
                });
            }, function error(res) {
                console.log(res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data.token);
                console.log('Token:', res.data.token);
                $location.path('/');
            }, function error(res) {
                console.log(res);
            });
        };
    }]);
