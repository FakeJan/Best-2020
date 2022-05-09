// var currentTags = [];

// $(document).ready(function () {
//     var tagInput = document.getElementById("tagInput");

//     var limitedParticipants = document.getElementById("limitedParticipants");

//     $('.input-daterange').datepicker({
//         format: 'dd.mm.yyyy',
//         autoclose: true,
//         calendarWeeks: true,
//         clearBtn: true,
//         disableTouchKeyboard: true
//     });

//     document.getElementById("addTagButton").addEventListener("click", () => {
//         addTag(tagInput.value);
//         tagInput.value = null;
//     });

//     tagInput.addEventListener("keypress", (e) => {
//         if (e.key === 'Enter') {
//             addTag(tagInput.value);
//             tagInput.value = null;
//         }
//     });

//     limitedParticipants.addEventListener('change', (e) => {
//         participantsMax.disabled = !limitedParticipants.checked;
//     })

//     document.getElementsByName("tag").forEach(x => {
//         currentTags.push(x.innerText.substring(0, x.innerText.length - 2).toUpperCase());
//     });

// });

// function validateEvent() {
//     var isValid = true;

//     var title = document.querySelector("#title");
//     let sporociloTitle = document.querySelector("#msgTitle");

//     title.classList.remove("is-valid");
//     title.classList.remove("is-invalid");
//     if (isEmptyOrSpaces(title.value)) {
//         title.classList.add("is-invalid");
//         sporociloTitle.innerHTML = "Obvezno polje"
//         isValid = false;
//     } else {
//         title.classList.add("is-valid");
//         sporociloTitle.innerHTML = ""
//     }

//     var obcina = document.querySelector("#city");
//     let sporociloObcina = document.querySelector("#msgObcina");

//     obcina.classList.remove("is-valid");
//     obcina.classList.remove("is-invalid");

//     if (isEmptyOrSpaces(obcina.value)) {
//         obcina.classList.add("is-invalid");
//         sporociloObcina.innerHTML = "Obvezno polje"
//         isValid = false;
//     } else {
//         obcina.classList.add("is-valid");
//         sporociloObcina.innerHTML = ""
//     }

//     var naslov = document.querySelector("#address");
//     let sporociloNaslov = document.querySelector("#msgNaslov");

//     naslov.classList.remove("is-valid");
//     naslov.classList.remove("is-invalid");

//     if (isEmptyOrSpaces(naslov.value)) {
//         naslov.classList.add("is-invalid");
//         sporociloNaslov.innerHTML = "Obvezno polje"
//         isValid = false;
//     } else {
//         naslov.classList.add("is-valid");
//         sporociloNaslov.innerHTML = ""
//     }

//     var date = document.getElementById("date");
//     var sporociloDate = document.getElementById("msgDate");
//     var dateString = date.value;

//     var dateParts = dateString.split(".");

//     // month is 0-based, that's why we need dataParts[1] - 1
//     var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], 1);

//     date.classList.remove("is-valid");
//     date.classList.remove("is-invalid");

//     const today = new Date();
//     const yesterday = new Date(today);

//     yesterday.setDate(yesterday.getDate() - 1)

//     if (isEmptyOrSpaces(dateString)) {
//         date.classList.add("is-invalid");
//         sporociloDate.innerHTML = "Obvezno polje"
//         isValid = false;
//     } else if (yesterday > dateObject) {
//         date.classList.add("is-invalid");
//         sporociloDate.innerHTML = "Neveljaven datum"
//         isValid = false;
//     } else {
//         date.classList.add("is-valid");
//         sporociloDate.innerHTML = ""
//     }




//     var tags = [];
//     document.getElementsByName("tag").forEach(x => {
//         tags.push(x.innerText.substring(0, x.innerText.length - 2));
//     });

//     if (!validateTags(tags)) {
//         isValid = false;
//     }


//     var limitedParticipants = document.getElementById("limitedParticipants");
//     var participantsMax = document.getElementById("participantsMax");
//     let sporociloMaxParticipants = document.querySelector("#msgParticipantsMax");
//     if (limitedParticipants.checked) {
//         if (isNumber(participantsMax.value)) {
//             participantsMax.className = "form-control is-valid";
//             sporociloMaxParticipants.innerHTML = "";
//         } else {
//             participantsMax.className = "form-control is-invalid";
//             sporociloMaxParticipants.innerHTML = "Neveljaven vnos";
//             isValid = false;
//         }
//     } else {
//         participantsMax.className = "form-control";
//         sporociloMaxParticipants.innerHTML = "";
//     }

//     if (!isValid) {
//         return { valid: false };
//     }

//     var description = document.getElementById("description");
//     let sporociloDescription = document.querySelector("#msgDescription");

//     description.classList.remove("is-valid");
//     description.classList.remove("is-invalid");

//     if(description.value.length > 800){
//         description.classList.add("is-invalid");
//         sporociloDescription.innerHTML = "Največ 800 znakov"
//         isValid = false;
//     } else {
//         description.classList.add("is-valid");
//         sporociloDescription.innerHTML = ""
//     }


//     var imageSrc = document.getElementById("eventImage").src;
//     imageSrc = imageSrc.substring(imageSrc.indexOf("/images/events/"), imageSrc.length);


//     var event = {
//         "title": title.value,
//         "eventImage": imageSrc,
//         "description": description.value,
//         "city": obcina.value,
//         "address": naslov.value,
//         "coordinates": koordinate,
//         "date": dateObject,
//         "tags": tags,
//         "participantMax": participantsMax.value,
//         "userId": JSON.parse(sessionStorage.getItem("uporabnik"))._id
//     }
//     if (!document.getElementById("limitedParticipants").checked) {
//         event.participantMax = 0;
//     }

//     event.participantMax = event.participantMax == "" ? 0 : event.participantMax;

//     return {
//         event: event,
//         valid: isValid
//     }
// }

// function validateTags(tags) {
//     let sporocilo = document.querySelector("#msgTags");

//     var t = document.querySelector("#tagsList");
//     t.classList.remove("is-valid");
//     t.classList.remove("is-invalid");

//     const uppercased = tags.map(tag => tag.toUpperCase());
//     const uppercasedAllTags = allTags.map(tag => tag.toUpperCase());

//     const noDups = new Set(uppercased);
//     if (noDups.size < 3) {
//         //todo: vsaj 3 tags
//         t.classList.add("is-invalid");
//         sporocilo.innerHTML = "Vsaj 3 različne oznake";
//         return false;
//     } else if (noDups.size !== uppercased.length) {
//         //todo: ne sme biti duplikatov
//         t.classList.add("is-invalid");
//         sporocilo.innerHTML = "Oznake se ne smejo ponavljati";
//         return false;
//     } else if (!uppercasedAllTags.some(r => uppercased.indexOf(r) >= 0)) {
//         t.classList.add("is-invalid");
//         sporocilo.innerHTML = "Vsaj 1 oznaka iz definiranega lista";
//         return false;
//     }
//     t.classList.add("is-valid");
//     sporocilo.innerHTML = "";
//     return true;
// }

// function isNumber(value) {
//     var num = /^(0|[1-9][0-9]*)$/;
//     return value != 0 && num.test(value)
// }

// function isEmptyOrSpaces(str) {
//     return str === null || str.match(/^ *$/) !== null;
// }

// function addTag(tagValue) {
//     tagValue = tagValue.trim();

//     if (!tagValue)
//         return;

//     var tagsList = document.getElementById("tagsList");

//     var tag = document.createElement("li");

//     tag.setAttribute("name", "tag");
//     tag.setAttribute("class", "chip mb-1 me-1");

//     tag.innerHTML = `${tagValue.trim()}`;


//     removeTagButton = document.createElement("span");
//     removeTagButton.setAttribute("class", "closebtn");
//     removeTagButton.innerHTML = `&times`;


//     removeTagButton.addEventListener("click", function name(params) {
//         removeTag(tag);
//     });

//     tag.appendChild(removeTagButton);
//     tagsList.appendChild(tag);

//     currentTags.push(tagValue.toUpperCase());
// }

// function removeTag(tag) {
//     var tagsList = document.getElementById("tagsList");
//     tagsList.removeChild(tag);
//     currentTags.splice(currentTags.indexOf(String(tag.value).toUpperCase()));
// }

// function addEvent() {
//     var validationResult = validateEvent();

//     if (!validationResult.valid) {
//         return;
//     }

//     fetch("../../create_event", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(validationResult.event)
//     }).then(res => {
//         if (res.status < 400) {
//             alert("dogodek ustvarjen");

//             var user = JSON.parse(sessionStorage.getItem("uporabnik"));

//             if (!user) {
//                 return;
//             }

//             window.location.href = "../../created_events/" + user._id;
//         } else {
//             res.json().then(data => {
//                 alert(data.sporočilo);
//             });
//         }
//     }).catch(error => {
//         console.log(error);
//     });
// }

// function updateEvent(eventId, eventCoordinates) {
//     var validationResult = validateEvent();

//     if (!validationResult.valid) {
//         return;
//     }

//     if (!validationResult.event.coordinates[0]) {
//         validationResult.event.coordinates = eventCoordinates;
//     }

//     fetch("../../edit_event/" + eventId, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'

//         },
//         body: JSON.stringify(validationResult.event)
//     }).then(res => {
//         if (res.status < 400) {
//             alert("dogodek posodobljen");
//         } else {
//             res.json().then(data => {
//                 alert(data.sporočilo);
//             });
//         }
//     }).catch(error => {
//         error.json().then(data => {
//             alert(data);
//         });
//         // console.log("wtf");
//         // alert(error);
//         // console.log(error);
//     });
// }

// function changeImage(imageUri) {
//     document.getElementById("eventImage").src = `/images/events/${imageUri}`;
//     $('#changePictureModal').modal('hide');
// }
