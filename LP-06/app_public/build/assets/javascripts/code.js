$(document).ready(function () {

  if (document.getElementsByClassName("input-daterange")[0])
    $('.input-daterange').datepicker({
      format: 'dd.mm.yyyy',
      autoclose: true,
      calendarWeeks: true,
      clearBtn: true,
      disableTouchKeyboard: true
    });

  var coordinates = [];
  events = document.body.getElementsByClassName("event");
  for (var i = 0; i < events.length; i++) {
    var lon = events[i].getElementsByClassName("card-body")[0].children[4].value;
    var lat = events[i].getElementsByClassName("card-body")[0].children[5].value;
    var obj = { lon: lon, lat: lat }
    coordinates.push(obj)
  }
  // getWeather(coordinates);

  let search = document.querySelector("#search");
  if (search != null) {
    search.addEventListener("input", function () {
      searchEvents();
    });
  }

  $('#myEventsNav').click(function () { getJoinedEvents(); return false; });

  // var user = JSON.parse(sessionStorage.getItem("uporabnik"));
  // if (document.getElementById('removeFilters')) {
  //   document.getElementById('removeFilters').href = `../events?q=${user._id}`;
  //   document.getElementById('removeFilter').href = `../events?q=${user._id}`;
  // }



});

var events;

function searchEvents() {
  var searchValue = document.getElementById("search").value;
  var events = document.body.getElementsByClassName("event");

  removeSearch(events);

  var regex = new RegExp(searchValue.toLowerCase());



  var exists = false;

  for (var i = 0; i < events.length; i++) {

    var tags = events[i].getElementsByClassName("chip");
    var eventsTags = "";

    for (let i = 0; i < tags.length; i++) {
      eventsTags += tags[i].innerText.trim() + " ";
    }

    var event = events[i];
    var eventTitle = events[i].getElementsByClassName("card-title")[0].firstChild.textContent.toLowerCase();
    if (!regex.test(eventTitle) && !regex.test(eventsTags.toLowerCase())) {
      event.style.display = 'none';
    } else {
      exists = true;
      event.style.display = 'block'
    }
  }

  // var noEvents = document.getElementById("noEvents");
  // noEvents.classList.remove("d-none");
  // noEvents.classList.remove("d-block");

  // if (!exists && events.length != 0) {
  //   noEvents.classList.add("d-block");
  // } else {
  //   noEvents.classList.add("d-none");
  // }


}

function openNav() {
  document.getElementById("main-sidebar-container").style.marginLeft = "0%";
}

function closeNav() {
  document.getElementById("main-sidebar-container").style.marginLeft = "-100%";
}

function removeSearch(events) {
  for (var i = 0; i < events.length; i++) {
    events[i].style.display = "none";
  }
}

// function dynamicSort(property) {
//   var sortOrder = 1;
//   if (property[0] === "-") {
//     sortOrder = -1;
//     property = property.substr(1);
//   }
//   return function (a, b) {
//     var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
//     return result * sortOrder;
//   }
// }

// function sortBy(user) {
//   var param = document.getElementById("sortBy").value;
//   var apiLink = window.location.href;
//   var usser = JSON.parse(sessionStorage.getItem("uporabnik"));

//   var type = apiLink.substring(22, 28);
//   var hrf = "http://localhost:3000/"
//   apiLink = apiLink.substring(22);


//   if (window.location.href.includes("https")) {
//     hrf = "https://goodmeets.herokuapp.com/"
//     var index = apiLink.indexOf(".com/") + 5;
//     type = apiLink.substring(index, index + 6);
//     apiLink = window.location.href.substring(32);
//   }


//   if (type === "events") {
//     apiLink = apiLink.replace("events", "dogodki");
//     var api = `api/${apiLink}`
//     fetch(`${hrf}${api}`)
//       .then(response => response.json())
//       .then(data => displaySortedEvents(data.events.sort(dynamicSort(param)), user, type));
//   } else if (type === "create") {
//     fetch(`${hrf}api/dogodki/ustvarjeni/${usser._id}`)
//       .then(response => response.json())
//       .then(data => displaySortedEvents(data.sort(dynamicSort(param)), usser, type));
//   } else {
//     fetch(`${hrf}api/dogodki/pridruzeni/${usser._id}`)
//       .then(response => response.json())
//       .then(data => displaySortedEvents(data.sort(dynamicSort(param)), usser, type));
//   }

// }

// function displaySortedEvents(data, uporabnik, type) {
//   var events = document.getElementById("neki");
//   while (events.firstChild) {
//     events.removeChild(events.firstChild);
//   }

//   data.forEach(event => {
//     var tagUl = document.createElement("ul");
//     tagUl.setAttribute("class", "chip-list");

//     event.tags.forEach(tag => {
//       var tagLi = document.createElement("li");
//       tagLi.setAttribute("class", "chip me-1");
//       tagLi.innerHTML = `${tag}`;
//       tagUl.appendChild(tagLi);
//     })

//     var stringList = tagUl.outerHTML;

//     var date = formatDate(event.date).toString();

//     var dogodek = document.createElement("div");

//     var user = JSON.parse(sessionStorage.getItem("uporabnik"));

//     dogodek.innerHTML = `
//         <div class="row">
//         <div class="card event">
//           <div class="row no-gutters">
//             <div class="col-md-3">
//               <img
//                 class="stock-image d-none d-md-block"
//                 src=${event.eventImage}
//                 alt=""
//                 class="img-fluid"
//               />
//             </div>

//             <div class="col-md-6 event-body">
//               <div class="card-body">
//                 <h5 class="card-title">${event.title}
//                 </h5>
//                 <p class="card-text"><b>Čas dogodka: </b>${date}</p>
//                 <p class="card-text"><b>Kraj dogodka:
//                   </b>${event.address}, ${event.city}</p>
//                 <p class="card-text d-md-none"><b>Vremenska napoved:
//                   </b></p>
//                 <div class="chip-div">
//                   ${stringList}
//                 </div>
//                 <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
//                 <a
//                   class="btn btn-success text-success border-0 mt-2 p-0 bg-transparent"
//                   data-bs-target="#a${event._id}"
//                   data-bs-toggle="collapse"
//                   aria-expanded="true"
//                   aria-controls="eventItem"
//                 >Več
//                   <i class="fas fa-angle-down"></i>
//                 </a>
//               </div>
//               <div id="a${event._id}" class="collapse" aria-labelledby="headingOne">
//                 <div class="card-body">
//                   ${event.description}
//                 </div>
//               </div>
//             </div>

//             <div class="col-md-3 event-side pt-0 pt-md-3 p-3 m-0 bottom-0">
//               <p class="m-0 mt-2 mt-md-0"><b>Število oseb:
//                 </b>
//                 ${event.participantMax > 0 ? `${event.users.length}/${event.participantMax}` : `${event.users.length}`}
//                 <i class="fas fa-user-friends me-2"></i>
//                   ${(type !== "events" || uporabnik.joined.includes(event._id) || uporabnik.created.includes(event._id)) ? `<a type="button" onclick="openChat('${event._id}')">
//                   <i
//                     class="bi bi-chat-left-dots fa-lg mt-2"
//                     style="color: black;"
//                   ></i>
//                 </a>` :
//         ``}
//               </p>
//               <img
//                 class="weather d-none d-md-block"
//                 src=""
//                 alt=""
//                 class="img-fluid"
//               />
//             <div class="joined-event-side">
//             </div>
//             </div>
//           </div>
//         </div>
//       </div>`

//     for (var x = 0; x < wll.length; x++) {
//       if (wll[x].lat == event.coordinates[1] && wll[x].lon == event.coordinates[0])
//         dogodek.getElementsByClassName("weather")[0].src = `/images/weather/${wll[x].weather}.png`;
//     }

//     if (type == "events") {
//       for (var i = 0; i < event.users.length; i++) {
//         if (event.users[i] == user._id) {
//           for (var j = 0; j < uporabnik.created.length; j++) {
//             if (uporabnik.created[j] == event._id) {
//               dogodek.getElementsByClassName("joined-event-side")[0].innerHTML =
//                 `<a class="btn btn-primary event-side-button mt-2 mt-xxl-0" role="button"
//                   href="../edit_event/${event._id}">Uredi</a>
//                 <button type="button" onclick="deleteEvent('${event._id}')"
//                   class="btn btn-danger event-side-button delete-button ms-2 mt-2 mt-xxl-0">Izbriši
//                 </button>`;
//               break;
//             } else {
//               dogodek.getElementsByClassName("joined-event-side")[0].innerHTML =
//                 `<button type="button" class="btn btn-success event-side-button mt-2 mt-md-0">Doniraj</button>
//                 <button type="button" onclick="leaveEvent('${event._id}')"
//                   class="btn btn-danger event-side-button ms-2 mt-2 mt-xxl-0">Odjavi se</button>`;
//             }
//           }
//           break;
//         } else {
//           dogodek.getElementsByClassName("joined-event-side")[0].innerHTML =
//             `<button
//               type="submit"
//               onclick="joinEvent('${event._id}')"
//               class="btn btn-success event-side-button"
//             >Pridruži se</button>`;
//         }
//       }
//     } else if (type == "create") {
//       dogodek.getElementsByClassName("joined-event-side")[0].innerHTML =
//         `<a class="btn btn-primary event-side-button mt-2 mt-xxl-0" role="button"
//           href="../edit_event/${event._id}">Uredi</a>
//         <button type="button" onclick="deleteEvent('${event._id}')"
//           class="btn btn-danger event-side-button delete-button ms-2 mt-2 mt-xxl-0">Izbriši
//         </button>`;
//     } else {
//       dogodek.getElementsByClassName("joined-event-side")[0].innerHTML =
//         `<button type="button" class="btn btn-success event-side-button mt-2 mt-md-0">Doniraj</button>
//         <button type="button" onclick="leaveEvent('${event._id}')"
//           class="btn btn-danger event-side-button ms-2 mt-2 mt-xxl-0">Odjavi se</button>`;
//     }


//     events.appendChild(dogodek);
//   });

// }

// function filter() {
//   var params = {};
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));
//   params.userId = user._id;

//   var locationParams = [];
//   if ($('input[name=chategory]:checked').length > 0) {
//     params.chategory = document.querySelector('input[name="chategory"]:checked').value;
//   }

//   var sDate = new Date(1970, 1, 1);
//   var eDate = new Date(2030, 1, 1);


//   var startDate = document.getElementById("startDate");
//   if (startDate.value) {
//     var startDateString = startDate.value;
//     var startDateParts = startDateString.split(".");

//     // month is 0-based, that's why we need dataParts[1] - 1
//     var startDateObject = new Date(+startDateParts[2], startDateParts[1] - 1, +startDateParts[0], 1);
//     sDate = startDateObject;
//   }

//   var endDate = document.getElementById("endDate");
//   if (endDate.value) {
//     var endDateString = endDate.value;
//     var endDateParts = endDateString.split(".");

//     // month is 0-based, that's why we need dataParts[1] - 1
//     var endDateObject = new Date(+endDateParts[2], endDateParts[1] - 1, +endDateParts[0], 1);
//     eDate = endDateObject;
//   }

//   // if (document.getElementsByName("sDate")[1].value != "")
//   //   sDate = new Date(document.getElementsByName("sDate")[1].value);
//   // else if (document.getElementsByName("sDate")[0].value != "")
//   //   sDate = new Date(document.getElementsByName("sDate")[0].value)

//   // if (document.getElementsByName("eDate")[1].value != "")
//   //   eDate = new Date(document.getElementsByName("eDate")[1].value);
//   // else if (document.getElementsByName("eDate")[0].value != "")
//   //   eDate = new Date(document.getElementsByName("eDate")[0].value)

//   params.startDate = sDate;
//   params.endDate = eDate;


//   var location = document.getElementsByName("location")[1].value;
//   if (location == "")
//     location = document.getElementsByName("location")[0].value;

//   if (location != "") {
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=14472f0ae561d135238e5d43702a22a8`)
//       .then(response => response.json())
//       .then(data => {
//         locationParams.push(data[0].lon);
//         locationParams.push(data[0].lat);
//         locationParams.push(document.getElementById("rangeSlider").value);
//         params.location = locationParams;
//         generateLink(params);
//       });
//   } else {
//     generateLink(params);
//   }
// }

// function generateLink(params) {
//   var link = `../eventsFilter?q=${params.userId}&startDate=${params.startDate}&endDate=${params.endDate}&`
//   if (params.hasOwnProperty('chategory'))
//     link = link + `chategory=${params.chategory}&`;
//   if (params.hasOwnProperty('location'))
//     link = link + `lng=${params.location[0]}&lat=${params.location[1]}&razdalja=${params.location[2]}`;
//   document.getElementById('filterButton').href = link;
//   document.getElementById('filterButton').click();
// }


// function getCreatedEvents() {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));

//   if (!user) {
//     // console.log("ni userja v sessionu");
//     return;
//   }

//   window.location.replace("../../created_events/" + user._id);
// }

// function getJoinedEvents() {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));

//   window.location.replace("../../joined_events/" + user._id);
// }

// function getEvents() {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));
//   window.location.replace("../../events?q=" + user._id);
// }

// function joinEvent(eventId) {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));
//   var data = { userId: user._id, eventId: eventId };

//   fetch("../../dogodek/pridruzi", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then(res => {
//     if (res.status < 400) {
//       document.location.reload();
//       // window.location.replace('../../events?q=' + user._id);
//     } else {
//       res.json().then(data => {
//         alert(data.sporočilo);
//       });
//     }
//   }).catch(error => {
//     console.log(error);
//   });
// }

// function leaveEvent(eventId, mainpage) {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));
//   var data = { userId: user._id, eventId: eventId };

//   fetch("../../dogodek/pridruzi", {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then(res => {
//     if (res.status < 400) {
//       document.location.reload();
//     } else {
//       res.json().then(data => {
//         alert(data.sporočilo);
//       });
//     }
//   }).catch(error => {
//     console.log(error);
//   });
// }

// function deleteEvent(eventId, optional) {
//   fetch("/edit_event/" + eventId, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(res => {
//     if (res.status < 400) {
//       document.location.reload();
//     } else {
//       res.json().then(data => {
//         alert(data.sporočilo);
//       });
//     }
//   }).catch(error => {
//     console.log(error);
//   });
// }

// function deleteUser(userId) {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));

//   fetch("/admin_uporabniki/" + userId, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(res => {
//     if (res.status < 400) {
//       document.location.reload();
//     } else {
//       res.json().then(data => {
//         alert(data.sporočilo);
//       });
//     }
//   }).catch(error => {
//     console.log(error);
//   });
// }

// function formatDate(date) {
//   var dateFormat = new Date(date);

//   var month = pad2(dateFormat.getMonth() + 1);//months (0-11)
//   var day = pad2(dateFormat.getDate());//day (1-31)
//   var year = dateFormat.getFullYear();

//   var formattedDate = day + "." + month + "." + year;

//   return formattedDate;
// };

// function pad2(n) {
//   return (n < 10 ? '0' : '') + n;
// }

// var wll = [];
// function getWeather(coordinates) {
//   var today = new Date();
//   for (var i = 0; i < events.length; i++) {
//     var a = i;
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[a].lat}&lon=${coordinates[a].lon}&exclude=current,minutely,hourly&appid=096504780fe605e465031f9803d0b902`)
//       .then(response => response.json())
//       .then(data => {

//         for (var i = 0; i < events.length; i++) {
//           if (parseFloat(events[i].getElementsByClassName("card-body")[0].children[5].value).toFixed(4) == data.lat) {
//             var dd = events[i].getElementsByClassName("card-text")[0].innerHTML.substring(21);
//             var d = dd.split('.');
//             var dif = dateDiff(today, new Date(d[2], d[1] - 1, d[0]));
//             if (dif > 7)
//               dif = 7;
//             if (dif < 0)
//               dif = 0;
//             var ob = { weather: data.daily[dif].weather[0].main, lat: parseFloat(events[i].getElementsByClassName("card-body")[0].children[5].value), lon: parseFloat(events[i].getElementsByClassName("card-body")[0].children[4].value) }
//             events[i].getElementsByClassName("card-text")[2].children[1].innerHTML = data.daily[dif].weather[0].main;
//             events[i].getElementsByClassName("event-side")[0].children[1].src = `/images/weather/${data.daily[dif].weather[0].main}.png`;
//             wll.push(ob);
//           }
//         }
//       });
//   }
// }

// function dateDiff(d1, d2) {
//   var t2 = d2.getTime();
//   var t1 = d1.getTime();

//   return parseInt((t2 - t1) / (24 * 3600 * 1000) + 1);
// }

// function openChat(eventId) {
//   var user = JSON.parse(sessionStorage.getItem("uporabnik"));
//   window.location.replace("../../event_chat/" + user._id + "?eventId=" + eventId);
// }

