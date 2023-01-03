"use strict";

let startingPostion;

// Success fucniton to set the starting position to the current user position
const successCallback = (position) => {
	startingPostion = { lat: position.coords.latitude, lng: position.coords.longitude };
};

// Incase of an error set the user starting position to Amman
const errorCallback = (error) => {
	startingPostion = { lat: 31.9539, lng: 35.9106 };
};

// Access the user location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

let map;
let places;
const cityInput = document.getElementById("city");

// Initialize Map
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 8,
		center: startingPostion,
	});

	places = new google.maps.places.Autocomplete(cityInput, {
		fields: ["formatted_address", "geometry", "name"],
		strictBounds: false,
		types: ["(cities)"],
	});
}

const form = document.getElementById("form");
form.addEventListener("submit", searchCity);

// Function to search for a specific City
function searchCity(event) {
	// Prevent refreshing the page after form submission
	event.preventDefault();

	const geocoder = new google.maps.Geocoder();

	geocoder.geocode({ address: cityInput.value }, function (results, status) {
		if (status === "OK") {
			map.setCenter(results[0].geometry.location);
		} else {
			alert("Unable to find entered city!");
		}
		// Reset City Input
		cityInput.value = "";
	});
}
