let map, directionsService, directionsRenderer;

function initializeAutocomplete() {
  const pickupInput = document.getElementById('pickup');
  const dropInput = document.getElementById('drop');

  new google.maps.places.Autocomplete(pickupInput);
  new google.maps.places.Autocomplete(dropInput);

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 19.0760, lng: 72.8777 }, // Mumbai center
    zoom: 13
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
}
window.onload = initializeAutocomplete;
// 2. Detect user's current location
function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      new google.maps.Geocoder().geocode({ location: latlng }, (res, status) => {
        if (status === 'OK' && res[0]) {
          document.getElementById('pickup').value = res[0].formatted_address;
        }
      });
    });
  }
}
// 3. Calculate distance and duration via Distance Matrix
function getDistance(pickup, drop, callback) {
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix({
    origins: [pickup],
    destinations: [drop],
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      const element = response.rows[0].elements[0];
      const km = element.distance.value / 1000;
      const duration = element.duration.text;
      document.getElementById('distance').value = km.toFixed(2);
      callback(km, duration);
    } else {
      alert('Distance error: ' + status);
    }
  });
}
// 4. Display route on map
function renderRoute(pickup, drop) {
  directionsService.route({
    origin: pickup,
    destination: drop,
    travelMode: 'DRIVING'
  }, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}
