import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
<<<<<<< HEAD
  let cities = await fetchCities()
  
  console.log("From Init");
  console.log(config.backendEndpoint+"/cities");
=======
  let cities = await fetchCities();

>>>>>>> ed0bb7c6b95e84a472e4ae466eadb60bb0449454
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
<<<<<<< HEAD
  try {
    
    let cities = await fetch(config.backendEndpoint + "/cities");
    cities = await cities.json();
    //cities = cities[id];
   // throw new Error(null);
    console.log(cities);
    return cities;
  }
  catch {
    return null;
  }
  
 

=======
>>>>>>> ed0bb7c6b95e84a472e4ae466eadb60bb0449454

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
<<<<<<< HEAD
  let tile = document.createElement("div")//.className = "col-xs-12 col-sm-6 col-xl-3 tile";
  tile.setAttribute("class", "col-xs-12 col-sm-6 col-xl-3 tile")
  tile.setAttribute("id", `${id}`);
  let htmlcontent = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <img class="img-fluid d-flex justify-content-center align-items-center" src="${image}"/></a>
  <h2 class="tile-text">${city}<br />${description}</h2>
  `
  tile.innerHTML = htmlcontent;
  let parent = document.getElementById("data");
  return parent.appendChild(tile);


}
//cd ..
//addCityToDOM("london", "London", "London", "London");
=======

}
>>>>>>> ed0bb7c6b95e84a472e4ae466eadb60bb0449454

export { init, fetchCities, addCityToDOM };
