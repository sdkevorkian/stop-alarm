angular.module('BusCtrls', ['BusServices'])
    .controller('WelcomeCtrl', ['$scope', function($scope) {

    }])
    .controller('AllStopsCtrl', ['$scope', 'BusStop', function($scope, BusStop) {
            $scope.searchStops = function() {
                var searchTerm = $scope.stopSearch.toLowerCase();
                BusStop.showAllStops().then(function(res) {
                    var stopsFiltered = res.data.filter(function(stop) {
                        var thisStop = stop.stop_name.toLowerCase();
                        return thisStop.includes(searchTerm);
                    });
                    $scope.stops = stopsFiltered;
                }).catch(function(res) {
                    $scope.stops = res;
                });
            };
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
