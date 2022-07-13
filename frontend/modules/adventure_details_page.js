//import { URLSearchParams } from "url";
import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);
  const adventureid = new URLSearchParams(search);
  let result = adventureid.get("adventure");
  console.log(result);

  // Place holder for functionality to work in the Stubs
  return result;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventuredetails = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let result = await adventuredetails.json();
    return result;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;
  document.getElementById(
    "adventure-subtitle"
  ).innerHTML = `${adventure.subtitle}`;
  document.getElementById(
    "adventure-content"
  ).innerHTML = `${adventure.content}`;
  let imagediv = document.getElementById("photo-gallery");

  adventure.images.map((image) => {
    let img = document.createElement("img");
    img.setAttribute("src", `${image}`);
    img.setAttribute("class", "img-fluid activity-card-image");
    imagediv.append(img);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carousel = document.getElementById("photo-gallery");
  carousel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="image-content">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  images.map((ele, i) => {
    let parentcontainer = document.getElementById("image-content");
    let itemelement = document.createElement("div");
    i == 0
      ? itemelement.setAttribute("class", "carousel-item active")
      : itemelement.setAttribute("class", "carousel-item");
    itemelement.innerHTML = `
    <img src=${ele} class="img-responsive img-fluid" style="width:100%;height:80vh;object-fit:cover">
    `;
    parentcontainer.append(itemelement);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (`${adventure.available}` === "true") {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById(
      "reservation-person-cost"
    ).innerHTML = `${adventure.costPerHead}`;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costresult = `${adventure.costPerHead}` * persons;
  console.log(costresult);
  let result = document.getElementById("reservation-cost");
  result.innerHTML = costresult;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitted");
    let formdata = new FormData(form);
    let dataobject = Object.fromEntries(formdata.entries());
    dataobject.adventure = `${adventure.id}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dataobject),
    };
    fetch(config.backendEndpoint + "/reservations/new", options)
      .then((responsedata) => {
        if (!responsedata.ok) {
          throw Error(responsedata.status);
        }
        location.reload();
        alert("succesfully submitted data");
        //console.log(responsedata.json());
        return responsedata.json();
      })
      .catch((e) => {
        alert("failed");
        console.log(e);
      });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (`${adventure.reserved}`=="true") {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
