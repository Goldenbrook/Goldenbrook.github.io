nav();

function nav(){
    const URL = "/acme/js/acme.json";
  fetch(URL)
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
    console.log(Object.keys(data));

    let name = Object.keys(data);

    let navname = '<li><a href="https://goldenbrook.github.io/acme/index.html">Home</a></li>';
            for (let i = 0; i < name.length; i++) {
                navname += '<li>' + name[i] + '</li>';
            }
            console.log(navname);

    document.getElementById('page-nav').innerHTML=navname;
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}







let pageNav = document.getElementById('nav');
let statusContainer = document.getElementById('home');
let contentContainer = document.getElementById('new-page');

pageNav.addEventListener('click', function(evt){

  // Get the City name
  let titleName = evt.target.innerHTML;
  switch (titleName) {
    case "Anvils":
      case "Explosives":
        case "Decoys":
          case "Traps":
          evt.preventDefault(); 
      
      break;

  }


// let hourlyList = document.getElementById("hourlyData");


let acmeURL = "../acme/js/acme.json";
// fetchData(weatherURL);

// function fetchData(weatherURL){
  // let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(acmeURL)
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
    let g = data[titleName];

    // ************ Get the content ******************************

    let nametitle = g.name;
    console.log(nametitle);





    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
//}
})