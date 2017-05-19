angular.module('BusCtrls', ['BusServices'])
    .controller('WelcomeCtrl', ['$scope', function($scope) {

    }])
    .controller('AllStopsCtrl', ['$scope', 'BusStop', function($scope, BusStop) {
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
        $scope.mapSrc = "https://maps.googleapis.com/maps/api/js?key=process.env.GOOGLE_MAPS_KEY&callback=initMap";
        BusStop.showStop($stateParams.id).then(function(res) {
            $scope.stop = res.data;
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
