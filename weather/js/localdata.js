

let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');


let weatherURL = "../weather.json/weather.json";
fetchData(weatherURL);

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let currTemp = g.Temp;
    console.log(currTemp);

    // Get the wind data 
    let windSpeed = g.Wind;
    console.log(windSpeed);

    // Get the current conditions
    let currCondition = g.Summary;
    console.log(currCondition);

    // Get the hourly data 
    let hourlyData = g.Hourly;
    console.log(hourlyData);

    // Get elevation
    let elev = g.Elevation;
    console.log(elev);

    // Get Zip
    let zip = g.Zip;
    console.log(zip);

    // Get Location
    let longitude = g.Longitude;
    console.log(longitude);
    let latitude = g.Latitude;
    console.log(latitude);

    // Get gusts
    let gusts = g.Gusts;
    console.log(gusts);

    // Get wind Direction
    let windDir = g.Direction;
    console.log(windDir);

    // Get high and low temp
    let high = g.High;
    console.log(high);
    let low = g.Low;
    console.log(low);

    // Get Precipitiation
    let precip = g.Precip;
    console.log('precipitation is:' +precip);


    // ************ Display the content ******************************
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


    // Set the temperature information
    document.getElementById('temp').innerHTML = currTemp; 

    // Set the wind information
    document.getElementById('winds').innerHTML = windSpeed;
    buildWC(windSpeed, currTemp);

    // Set the current conditions information
    document.getElementById('sum-title').innerHTML = currCondition;

    // Set the hourly temperature information
    document.getElementById('overflow').innerHTML = buildHourlyData(nextHour, hourlyData);

    // Set background images
    let condition = getCondition(currCondition);
    changeSummaryImage(condition);

    // Set elevation
    document.getElementById('elevation').innerHTML = meterstoFeet(elev);

    // Set zip
    document.getElementById('zipcode').innerHTML = zip;

    // Set Long and Lat
    document.getElementById('long').innerHTML = longitude;
    document.getElementById('lat').innerHTML = latitude;

    // Set Gusts
    document.getElementById('gust').innerHTML = gusts;

    // Set wind Direction
    document.getElementById('dir').innerHTML = windDir;
    
    // Set high and low temp
    document.getElementById('high').innerHTML = high;
    document.getElementById('lowTemp').innerHTML = low;

    // Set Precipitation
    document.getElementById('precip').innerHTML = precip;

    // Set wind dial
    windDial(windDir);



    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}