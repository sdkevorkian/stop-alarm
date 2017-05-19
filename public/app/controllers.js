angular.module('BusCtrls', ['BusServices'])
    .controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.Auth = Auth;
        $scope.logout = function() {

            Auth.removeToken();
        };
    }])
    .controller('AllStopsCtrl', ['$scope', 'BusStop', function($scope, BusStop) {
        $(".button-collapse").sideNav();
        $scope.searchStops = function() {
            // puts to lowercase so that user can type as they want
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
    }])
    .controller('ShowCtrl', ['$scope', '$stateParams', 'BusStop', function($scope, $stateParams, BusStop) {
        BusStop.showStop($stateParams.id).then(function(res) {
            $scope.stop = res.data;
            var userLocation = '47.6685791,-122.2883';
            var destination = `${$scope.stop.stop_lat},${$scope.stop.stop_lon}`;
            BusStop.calcDistance(userLocation, destination).then(function(res) {
                console.log(res.data);
            }).catch(function(err) {
                console.log(err);
            });
        });
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
                    $location.path('/stops');
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
                $location.path('/stops');
            }, function error(res) {
                console.log(res);
            });
        };
    }]);
