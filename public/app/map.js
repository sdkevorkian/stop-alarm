var map;
var prevInfoWindow;
var initMap = function() {
    // center map on coordinates of address selected
    var addressCoords = { lat: stop.stop_lat, lng: stop.stop_lon };
    map = new google.maps.Map(document.getElementById('map'), {
        center: addressCoords,
        zoom: 14,
        styles: [{
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#e0efef"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "hue": "#1900ff"
            }, {
                "color": "#c0e8e8"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "lightness": 100
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }, {
                "lightness": 700
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#7dcdcd"
            }]
        }]
    });


    // var position = new google.maps.LatLng(address.lat, address.long);
    // display marker for address
    var addressMarker = new google.maps.Marker({
        position: { lat: address.lat, lng: address.long },
        title: address.name,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    });
    // Bind a popup to the  address marker
    addressMarker.addListener('click', function() {
        var infoWindow = new google.maps.InfoWindow({
            content: '<h3>' + address.name + '</h3>'
        });
        infoWindow.open(map, addressMarker);
    });

};
