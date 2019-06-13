function initMap(lat = 14.6072565, lng = 121.0273014) {
    var position = { lat: lat, lng: lng }

    var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 15
    });

    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
}

var branches = document.querySelectorAll('.branch');

branches.forEach(function(branch) {
    branch.addEventListener('click', function() {
        var address = branch.children[1].innerHTML;

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=')
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                initMap(lat, lng);
            })
            .catch(function(error) {
                console.log(error);
            });
    });
});
