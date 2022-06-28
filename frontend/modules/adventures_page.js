
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const p = new URLSearchParams(search);
  let result= p.get('city');
 // console.log(Array.from(p).length)
 // console.log(p);
  return result;
  

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    
    let adventures = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    adventures = await adventures.json();
    //cities = cities[id];
   // throw new Error(null);
    //console.log(adventures);
    return adventures;
  }
  catch {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  //console.log(adventures[1].id);
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //let container = document.createElement("container");
  //container.setAttribute("class","")
  //console.log(adventures);
  
  let parent = document.getElementById("data");
  
  for (let i in adventures) {
    //console.log(adventures[i][id]);
   // console.log("hello");
    
    let div = document.createElement("div");
    div.setAttribute("class", "col-6 col-xs-6 col-sm-6 col-xl-3")
   //div.setAttribute("id",`${adventures[i].id}`)
    let text = `
        <a href="detail/?adventure=${adventures[i].id}" id="${adventures[i].id}">
          <div class="activity-card d-flex flex-column border-dark">
         

            <img src=${adventures[i].image} class="img-fluid img-responsive">
            <div
              class=" d-flex  align-items-stretch justify-content-between"
            >
              <h5>${adventures[i].name}</h5>
              <h5>₹${adventures[i].costPerHead}</h5>
            </div>
            <div
              class=" d-flex align-items-stretch justify-content-between"
            >
              <h5>Duration</h5>
              <h5>${adventures[i].duration} hours</h5>
          </div>
           
          <div class="category-banner">${adventures[i].category}</div> 
        </div>
        
        </a>
        
        

    `;
    div.innerHTML = text;
    parent.appendChild(div);


  }
  
 


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newlist = list.filter(function (e) {
    return e.duration>=low&&e.duration<=high
  })

  //console.log(newlist);
  return newlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 let newlist=list.filter(function (e) {
    for (let item in categoryList) {
       // console.log(categoryList[item]);
        //console.log(e.category)
      // console.log(categoryList[item] == e.category)
      if (categoryList[item] == e.category)
        return true;
    }
 })
  //console.log(newlist);
  return newlist;

}


// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //console.log(filters);
  
let filteredList = [];

  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,choice[0],choice[1]
    );
  }

  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  else {
    filteredList = list;
  }
  console.log(typeof (filteredList));
  return filteredList;

  // Place holder for functionality to work in the Stubs
  return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let result = JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return result;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
// filters.filter(category
  let parent = document.getElementById("category-list");
  for (let i in filters.category) {
    let pill = document.createElement("div");
  pill.setAttribute("class", "category-filter");
    let text = `
  ${filters.category[i]}
  `;
    pill.innerHTML = text;
    parent.appendChild(pill);
    
  }
  return parent;
  
  
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
