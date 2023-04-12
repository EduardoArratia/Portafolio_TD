mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkb2FycmF0aWEiLCJhIjoiY2oyczh6NGU0MDAzajMwbnZ5OWV4aTVoeSJ9.VnYlSDsnqUCZQRVIQe9C7g';
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [-71.55, -33.02], // starting position [lng, lat] // ESTAN AL REVES LA LATITUD Y LONGITUD
zoom: 15 // starting zoom
});

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
    );

    //hacer una clase que contenga el post-delete-upload