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
