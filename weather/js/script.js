// Get location to request data
'use strict';


//Set Golbal variables
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

// Set global variable for custom header required by NWS API

let storage = window.localStorage;
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - spo17001@byui.edu"
    }
};


// let speed = document.getElementById('currWind');
// let temp = document.getElementById('currTemp');

const temp = 31;
const speed = 5;

// console.log(`speed is ${speed}`);
// console.log(`temp is ${temp}`);

buildWC(speed, temp);
// Calculate the Windchill
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');

    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
}


// wind dial turning function

// const direction = "NNE"; //Set your own value
// windDial(direction);

// Wind Dial Function
function windDial(direction) {
    // Get the wind dial container
    const dial = document.getElementById("dial");
    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}

//Call functions
// const weatherCondition = "rain"; //Set your own value
// let weather = getCondition(weatherCondition);
// changeSummaryImage(weather);


//Determine what the value is.
function getCondition(weatherCondition) {
    if (weatherCondition.includes("Clear") || weatherCondition.includes("sunny")) {
        return "clear";
    } else if (weatherCondition.includes("Rain") || weatherCondition.includes("Thunderstorms")) {
        return "rain";
    } else if (weatherCondition.includes("Cloudy")) {
        return "cloudy";
    } else if (weatherCondition.includes("Fog")) {
        return "fog";
    } else {
        return "snow";
    }
}

//Change class according to the value
function changeSummaryImage(weatherCondition) {
    const largeframe = document.getElementById("largeframe");
    console.log(weatherCondition);
    switch (weatherCondition) {
        case "clear":
            largeframe.setAttribute("class", "clear");
            break;
        case "rain":
            largeframe.setAttribute("class", "rain");
            break;
        case "cloudy":
            largeframe.setAttribute("class", "cloud");
            break;
        case "fog":
            largeframe.setAttribute("class", "fog");
            break;
        case "snow":
            largeframe.setAttribute("class", "snow");
            break;

    }
}


// Convert meters to feet

// let meters = document.getElementById('meters');
// let meters = 1514.246;
// let feet = meterstoFeet(meters);
// let elevation = document.getElementById("elevation");
// elevation.innerHTML = feet;

function meterstoFeet(meters) {
    //calculate meters to feet
    let f = meters * 0.3048;
    console.log(f);
    // round to nearest integer
    f = Math.floor(f);
    return f;
}


// Get the next hour based on the current time
//These are the variables for the function
let date = new Date();
let nextHour = date.getHours() + 1;
let hourlyListItems;
let hourlyTemps;

//call functions


// Convert, Format time to 12 hour format
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 175 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}

function convertToCelcius(temp) {
    let fahrenheit = Math.floor((temp * 9/5) + 32);
    console.log("Returns value of" + fahrenheit);
    return fahrenheit;

}













// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale;
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
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
        .then(function (response) {
            if (response.ok) {
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
            let stationElevation = Number(data.features[0].properties.elevation.value);
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
        .then(function (response) {
            if (response.ok) {
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
            storage.setItem("temp", Number(data.properties.temperature.value.toFixed(0)));
            storage.setItem("windspeed", data.properties.windSpeed.value);
            storage.setItem("currCondition", data.properties.textDescription);
            storage.setItem("windchill", data.properties.windChill.value);
            //    storage.setItem("max", data.properties.maxTemperatureLast24Hours.value);
            //    storage.setItem("min", data.properties.minTemperatureLast24Hours.value);
            storage.setItem("precip", data.properties.precipitationLastHour.value);

            // wind direction
            //temp
            //wind speed 
            //Summary




            // Build the page for viewing 


            getForcast();
            buildPage();


        })
        .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function

function getForcast() {
    const URL = "https://api.weather.gov/gridpoints/PIH/125,87/forecast";
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getForcast function:');
            console.log(data);
            // Store data to localstorage 

            storage.setItem("max", data.properties.periods['0'].temperature);
            storage.setItem("min", data.properties.periods['1'].temperature);
            storage.setItem("windDirection", data.properties.periods['0'].windDirection);
            storage.setItem("gusts", data.properties.periods['0'].windSpeed);

            //  Forcast Temperatures
            //  Time
            //  Windspeed

            getHourly();
        })
        .catch(error => console.log('There was a getForcast error: ', error))
} // end getLocation function

function getHourly() {
    const URL = "https://api.weather.gov/gridpoints/PIH/125,87/forecast/hourly";
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getHourly function:');
            console.log(data);
            // Store data to localstorage 

            //   storage.setItem("hr1", data.properties.periods['0'].temperature);
            //   storage.setItem("hr2", data.properties.periods['1'].temperature);
            //   storage.setItem("hr3", data.properties.periods['2'].temperature);
            //   storage.setItem("hr4", data.properties.periods['3'].temperature);
            //   storage.setItem("hr5", data.properties.periods['4'].temperature);
            //   storage.setItem("hr6", data.properties.periods['5'].temperature);
            //   storage.setItem("hr7", data.properties.periods['6'].temperature);
            //   storage.setItem("hr8", data.properties.periods['7'].temperature);
            //   storage.setItem("hr9", data.properties.periods['8'].temperature);
            //   storage.setItem("hr10", data.properties.periods['9'].temperature);
            //   storage.setItem("hr11", data.properties.periods['10'].temperature);
            //   storage.setItem("hr12", data.properties.periods['11'].temperature);
            //   storage.setItem("hr13", data.properties.periods['12'].temperature);

            let hourlyForcast = [];
            for (let i = 0; i < 13; i++) {
                hourlyForcast[i] = data.properties.periods[i].temperature;
            }
            console.log(hourlyForcast);
            storage.setItem('hourly', buildHourlyData(nextHour, hourlyForcast));



        })
        .catch(error => console.log('There was a getHourly error: ', error))
} // end getLocation function



function buildPage() {
    //Call windchill function
    buildWC(storage.getItem('windspeed'), convertToCelcius(storage.getItem('temp')));

    //Turn wind Dial
    windDial(storage.getItem('windDirection'));

    //Change background image
    changeSummaryImage('currCondition');

    //Convert elevation from meters to feet

    let toFeet = meterstoFeet(storage.getItem('stationElevation'));
    console.log(toFeet);
    document.getElementById('elevation').innerHTML = toFeet;

    // Build hourly temperatures
    document.getElementById('overflow').innerHTML = storage.getItem('hourly');
    console.log((storage.getItem('hourly')));

    // Add in title
    let fullName = storage.getItem('locName')+', '+ storage.getItem('locState');
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('town');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"

    //Add in location
    document.getElementById('long').innerHTML = storage.getItem('longitude') + "&deg; N";
    document.getElementById('lat').innerHTML = storage.getItem('latitude') + "&deg; W";

    // Set the temperature information
    
    document.getElementById('temp').innerHTML = convertToCelcius(storage.getItem('temp')) + '&deg; F'; 

    // Set high and low temp
    document.getElementById('high').innerHTML = storage.getItem('max');
    document.getElementById('lowTemp').innerHTML = storage.getItem('min');

    // Set wind Direction
    document.getElementById('dir').innerHTML = storage.getItem('windDirection');

    // Set Gusts
    document.getElementById('gust').innerHTML = storage.getItem('gusts');

    // Set the current conditions information
    document.getElementById('sum-title').innerHTML = storage.getItem('currCondition');

    //Set windspeed in dial
    document.getElementById('winds').innerHTML = storage.getItem('windspeed');


    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container

}