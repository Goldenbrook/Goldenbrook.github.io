// let speed = document.getElementById('currWind');
// let temp = document.getElementById('currTemp');

const temp = 31;
const speed = 5;

// console.log(`speed is ${speed}`);
// console.log(`temp is ${temp}`);

buildWC(speed, temp)
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



    // Convert meters to feet

    // let meters = document.getElementById('meters');
    let meters = 1514.246;
    let feet = meterstoFeet(meters);
    let elevation = document.getElementById("elevation");
    elevation.innerHTML = feet;

    function meterstoFeet(meters){
        //calculate meters to feet
        let f = meters * 0.3048;
        console.log(f);
        // round to nearest integer
        f = Math.floor(f);
        return f;
    }

    