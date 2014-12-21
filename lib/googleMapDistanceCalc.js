/**
 * Created by cranabahu on 12/17/14.
 */

distanceMatrix = {
    geocoder : null,
    bounds   : null,
    origin  : null,
    destination : null,

    calculateDistances:function(destinationCoordinateArrayVar,originCoordinateArrayVar){
        geocoder = new google.maps.Geocoder();
        bounds = new google.maps.LatLngBounds();
        //origin = new google.maps.LatLng(originLat,originLonVar);
        //destination = new google.maps.LatLng(destinationLatVar,destinationLonVar);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: destinationCoordinateArrayVar,
                destinations: originCoordinateArrayVar,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, this.callback);
    },

    callback: function(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
        } else {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var  distanceArray = [];
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    distanceArray.push(results[j].distance.value);
                }
            }
            Session.set('distanceArray',distanceArray);
        }
    }
};