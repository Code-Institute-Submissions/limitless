// Map variables
var map;
var place;
var infoWindow;
var markers = [];
var autocomplete;

// Initialise map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 54.5260, lng: 15.2551},
        // Map controls allowing user to zoom in/out, switch to satellite mode and view streetview images
        mapTypeControl: true,
        zoomControl: true,
        streetViewControl: true
    });

    // Info window with place details
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('place-details')
    });

    // Autocomplete
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'));
        places = new google.maps.places.PlacesService(map);
        autocomplete.addListener('place_changed', onPlaceChanged); // Resets map to new area that has been searched
        document.getElementById('accommodation-filter').addEventListener('change', onPlaceChanged);
        document.getElementById('food-filter').addEventListener('change', onPlaceChanged);
        document.getElementById('interest-filter').addEventListener('change', onPlaceChanged);  
}

// Select autocomplete query - return details of place and zoom into area
function onPlaceChanged() {
    if ($("#accommodation-filter").is(':checked')) {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            searchAccommodation();
        }
        else {
            $('#autocomplete').attr("placeholder", "Search");
        }
    }
    else if ($("#food-filter").is(':checked')) {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            searchFoodAndDrink();
        }
        else {
            $('#autocomplete').attr("placeholder", "Search");
        }
    }
    else if ($("#interest-filter").is(':checked')) {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            searchPointOfInterest();
        }
        else {
            $('#autocomplete').attr("placeholder", "Search");
        }
    }
}