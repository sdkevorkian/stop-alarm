angular.module('BusServices', [])

.factory('BusStop', ['$http', function($http) {
    return {
        showStop: function(id) {
            return $http.get('/api/airplanes/' + id);
        },
        showAllStops: function() {
            // may need to add user input here? or make new service??
            var req = {
                url: '/api/airplanes',
                method: 'GET'
            };
            return $http(req);
        }
    };
}]);
