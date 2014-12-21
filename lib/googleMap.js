/**
 * Created by cranabahu on 12/9/14.
 */
gmap = {

    map: null,

    initialize:function() {
        var latlng = new google.maps.LatLng(7.2782568,80.6584244);
        var mapOptions = {
            zoom: 15,
            center: latlng
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        console.log('map intialized');
        /*var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         title: 'Hello World!'
         });*/
    },

    codeAddress:function(address) {
        this.initialize();
        console.log('map codeAddress');
        var geocoder = new google.maps.Geocoder();
        //var address = document.getElementById("addr").value;
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                Session.set('Lat', results[0].geometry.location.lat());
                Session.set('Lng', results[0].geometry.location.lng());
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },

    clearMapDiv: function () {
        document.getElementById('map-canvas').innerHTML='';
        //deleteOverlays();
        document.getElementById('map-canvas').style.backgroundColor='white';
    }
};