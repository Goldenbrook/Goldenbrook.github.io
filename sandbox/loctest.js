// Get location to request data
'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - spo17001@byui.edu"
    }
  };

// Call the function to get our location
getGeoLocation();

// Gets longitude and latitude of current location
function getGeoLocation() {

    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
      
         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);

         storage.setItem("latitude", lat.toFixed(2));
         storage.setItem("longitude", long.toFixed(2));
      
         // Call getLocation function, send locale
            getLocation(locale);
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
    } //end getGeoLocation


    // Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
    //    storage.setItem("latitude", data.geometry.coordinates["0"]);
    //    storage.setItem("longitude", data.geometry.coordinates["1"]);
       storage.setItem("temp", data.properties.temperature.value.toFixed(0));
       storage.setItem("windspeed", data.properties.windSpeed.value);
       storage.setItem("currCondition", data.properties.textDescription);
       storage.setItem("gusts", data.properties.windGust.value);
       storage.setItem("windchill", data.properties.windChill.value);
       storage.setItem("max", data.properties.maxTemperatureLast24Hours.value);
       storage.setItem("min", data.properties.minTemperatureLast24Hours.value);
       storage.setItem("precip", data.properties.precipitationLastHour.value);

       // wind direction
       //temp
       //wind speed 
       //Summary
       

   
   
      // Build the page for viewing 
      

      getForcast();

     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

// Build hourly function.


   function getForcast() {
    const URL = "https://api.weather.gov/gridpoints/PIH/125,87/forecast"; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getForcast function:'); 
      console.log(data);
      // Store data to localstorage 
  
  

          //  Forcast Temperatures
          //  Time
          //  Windspeed
   

     }) 
    .catch(error => console.log('There was a getForcast error: ', error)) 
   } // end getLocation function


let storage = window.localStorage;