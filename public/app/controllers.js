angular.module('BusCtrls', ['BusServices'])
    .controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
        $scope.Auth = Auth;
        $scope.logout = function() {
            Materialize.toast('You have logged out', 4000);
            Auth.removeToken();
            $location.path('/');
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
    .controller('ShowCtrl', ['$scope', '$stateParams', '$interval', 'BusStop', function($scope, $stateParams, $interval, BusStop) {
        BusStop.showStop($stateParams.id).then(function(res) {
            $scope.stop = res.data;
            $scope.stopWithinRange = false;
            var audio = document.getElementById('alarm-sound');

            $scope.setAlarm = function() {
                $scope.alarmSet = true;
            };

            $scope.stopAlarm = function() {
                audio.pause();
                $scope.alarmSet = false;
            };
            // gets position from browser-NOTE will not work iif not set to https
            navigator.geolocation.getCurrentPosition(function(position) {

                var userLocation = { lat: position.coords.latitude, lon: position.coords.longitude };
                var destination = { lat: $scope.stop.stop_lat, lon: $scope.stop.stop_lon };
                // on interval, checks if close to stop and if so will display and play audio
                $interval(function() {
                    $scope.distanceFromStop = getDistanceFromLatLonInMi(userLocation.lat, userLocation.lon, destination.lat, destination.lon).toFixed(2);
                    if ($scope.distanceFromStop < 0.25 && $scope.alarmSet) {
                        $scope.stopWithinRange = true;
                        audio.play();
                    }
                }, 1000);

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
                $location.path('/stops');
            }, function error(res) {
                console.log(res);
            });
        };
    }]);

// helper functions
function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
    var R = 3958.756; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
