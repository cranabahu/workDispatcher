/**
 * Created by cranabahu on 12/17/14.
 */

distanceMatrix = {
    geocoder : null,
    bounds   : null,
    origin1  : null,
    origin2  : null,
    destinationA : null,
    destinationB : null,

    calculateDistances:function(){
        geocoder = new google.maps.Geocoder();
        bounds = new google.maps.LatLngBounds();
        origin1 = new google.maps.LatLng(55.930, -3.118);
        origin2 = 'Greenwich, England';
        destinationA = 'Stockholm, Sweden';
        destinationB = new google.maps.LatLng(50.087, 14.421);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin1, origin2],
                destinations: [destinationA, destinationB],
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

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                console.log(origins[i]);
                for (var j = 0; j < results.length; j++) {
                    console.log(destinations[j]);
                    console.log(origins[i]);
                    console.log(destinations[j]);
                    console.log(results[j].distance.text);
                    console.log(results[j].duration.text);
                }
            }
        }
    }
};