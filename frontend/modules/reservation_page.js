import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservation=await fetch(config.backendEndpoint + `/reservations`);
    reservation = await reservation.json();
    console.log(reservation);
    return reservation;
 } 

  // Place holder for functionality to work in the Stubs
  catch {
    return null;
    
  }
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length == 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    
  }
  reservations.forEach(element => {
    let tabledata = document.getElementById("reservation-table");
    let row = document.createElement("tr");
    let options1={day:"numeric",month:"numeric",year:"numeric"}
    let mydate = new Date(`${element.date}`);
    
    let options = { timeStyle: "medium"}
    let options2 = { day:"numeric",month:"long",year:"numeric" }
    let mytime = new Date(`${element.time}`);
    let mydate1 = mydate.toLocaleDateString('en-IN', options1);
    let mydate2 = mytime.toLocaleDateString('en-IN', options2);
    mytime=mytime.toLocaleString('en-IN',options)
   // console.log(`${ element.date }`);
    row.innerHTML = `
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.adventureName}</td>
    <td>${element.person}</td>
    <td>${mydate1}</td>
    <td>${element.price}</td>
    <td>${mydate2}, ${mytime}</td>
    <td id=${element.id}><a href='/frontend/pages/adventures/detail/?adventure=${element.adventure}'><button type="button" class="reservation-visit-button" >visit adventure</button></a></td>
    `;
    tabledata.append(row);
    console.log(tabledata);
    
  });
  
}

export { fetchReservations, addReservationToTable };
