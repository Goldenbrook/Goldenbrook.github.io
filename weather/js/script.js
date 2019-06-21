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
    wc = (wc > temp)?temp:wc;
   
    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
    }


// wind dial turning function

// const direction = "NNE"; //Set your own value
// windDial(direction);

// Wind Dial Function
function windDial(direction){
    // Get the wind dial container
    const dial = document.getElementById("dial");
     // Determine the dial class
 switch (direction){
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
function getCondition(weatherCondition){
    if (weatherCondition.includes ("clear") || weatherCondition.includes("sunny")) {
        return "clear";
    }
    else if (weatherCondition.includes("rain")){
        return "rain";
    }
    else if (weatherCondition.includes("cloudy") || weatherCondition.includes("Thunderstorms")){
        return "cloudy";
    }
    else if (weatherCondition.includes("fog")){
        return "fog";
    }
    else {
        return "snow";
    }
}

//Change class according to the value
function changeSummaryImage(weatherCondition){
    const largeframe = document.getElementById("largeframe");
console.log(weatherCondition);
    switch(weatherCondition){
        case "clear":
        largeframe.setAttribute("class", "clear");
        break;
        case "rain":
        largeframe.setAttribute("class", "rain");
        break;
        case "cloudy":
        largeframe.setAttribute("class", "cloud");
        break;
        case  "fog":
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

    function meterstoFeet(meters){
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
    if(hour > 23){ 
        hour -= 24; 
       } 
       let amPM = (hour > 11) ? "pm" : "am"; 
       if(hour > 12) { 
        hour -= 12; 
       } 
       if(hour == 0) { 
        hour = "12"; 
       } 
       return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 175 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }

