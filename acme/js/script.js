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

    let navname = '<li> Home </li>';
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