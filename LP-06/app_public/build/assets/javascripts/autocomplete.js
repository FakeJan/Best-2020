
// $(document).ready(function () {
//     autocomplete(document.getElementById("tagInput"), allTags);
// });



// var allTags = ["Šport", "Zunaj", "Ekipni šport", "Piknik",
// "Morje","Smučanje","Bazen","Kopanje","Sneg","Učenje","Šola",
// "Odbojka","Rokomet","Nogomet","Fizika","Matematika","Film","Zabava",
// "Tek","Hoja","Pohod","Hrib","Gorjanci","Sprehod","BBQ",
// "Plavanje","Poletje","Zima","Rojstni dan","50-letnica","Koncert",
// "Kino","Serija","Druženje","Hrana","Pijača","Počitnice",
// "Nagrada","Slovenija","Amerika","Tujina","Namizni nogomet","Tenis",
// "Namizni tenis","Vikend","Vikend zabava","Družabne igre", "Jahanje", "Golf", "Pikado", "Dirka", "Gledališče", "Stand up",
// "Poletje", "Zima", "Petek", "Festival", "Kulinarika",];
// function autocomplete(inp, listOfValues) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;

//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function (e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false; }
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);

//         var maxElements = 5;
//         var currentElements = 0;

//         var lastElement = null;

//         /*for each item in the array...*/
//         listOfValues.forEach(element => {
//             if (currentElements <= maxElements) {

//                 var words = element.split(" ");
//                 var matches = false;
//                 var fullWord = "";

//                 //match any subword in a word
//                 words.forEach(word => {
//                     if (word.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                         matches = true;
//                         var matchWord = word.substr(0, val.length);
//                         fullWord += `<strong>${matchWord}</strong>`;
//                         if (matchWord != "&")
//                             fullWord += `${word.substr(val.length)} `;
//                         else
//                             fullWord += " ";
//                     } else {
//                         fullWord += `${word} `;
//                     }
//                 });

//                 //match entire word until now
//                 if (!matches) {
//                     if (element.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
//                         matches = true;
//                         fullWord = `<strong>${element.substr(0, val.length)}</strong>` + element.substr(val.length, element.length);
//                     }
//                 }

//                 if (matches && !currentTags.includes(element.toUpperCase())) {
//                     currentElements++;
//                     b = document.createElement("DIV");

//                     b.setAttribute("class", "autocomplete-item-notlast");

//                     b.innerHTML = fullWord.trim();
//                     /*insert a input field that will hold the current array item's value:*/
//                     b.innerHTML += `<input type='hidden' value='${element}'>`;
//                     /*execute a function when someone clicks on the item value (DIV element):*/
//                     b.addEventListener("click", function (e) {
//                         inp.value = this.getElementsByTagName("input")[0].value;
//                         /*Use JSInterop to invoke C# functions */
//                         closeAllLists();
//                     });

//                     lastElement = b;

//                     a.appendChild(b);
//                 }
//             }
//         });


//         if (lastElement != null && !currentTags.includes(val.trim().toUpperCase())) {
//             b = document.createElement("DIV");

//             b.innerHTML = "<b>" + val.trim() + "</b>";
//             /*insert a input field that will hold the current array item's value:*/
//             b.innerHTML += `<input type='hidden' value='${val}'>`;
//             /*execute a function when someone clicks on the item value (DIV element):*/
//             b.addEventListener("click", function (e) {
//                 inp.value = this.getElementsByTagName("input")[0].value;
//                 /*Use JSInterop to invoke C# functions */
//                 closeAllLists();
//             });

//             a.appendChild(b);
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function (e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//             /*If the arrow DOWN key is pressed,
//             increase the currentFocus variable:*/
//             currentFocus++;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 38) { //up
//             /*If the arrow UP key is pressed,
//             decrease the currentFocus variable:*/
//             currentFocus--;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 13 || e.keyCode == 9) {
//             /*If the ENTER key is pressed, prevent the form from being submitted,*/
//             if (currentFocus > -1) {
//                 /*and simulate a click on the "active" item:*/
//                 if (x) {
//                     x[currentFocus].click();
//                     e.preventDefault();
//                 }

//             } else {
//                 if (x && x[0]) {
//                     x[0].click();
//                     e.preventDefault();
//                 }

//             }
//         }
//     });
//     function addActive(x) {
//         /*a function to classify an item as "active":*/
//         if (!x) return false;
//         /*start by removing the "active" class on all items:*/
//         removeActive(x);
//         if (currentFocus >= x.length) currentFocus = 0;
//         if (currentFocus < 0) currentFocus = (x.length - 1);
//         /*add class "autocomplete-active":*/
//         if (x.length == 0) {
//             return;
//         }
//         x[currentFocus].classList.add("autocomplete-active");
//         inp.value = x[currentFocus].textContent;
//     }
//     function removeActive(x) {
//         /*a function to remove the "active" class from all autocomplete items:*/
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active");
//         }
//     }
//     function closeAllLists(elmnt) {
//         /*close all autocomplete lists in the document,
//         except the one passed as an argument:*/
//         var x = document.getElementsByClassName("autocomplete-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt != x[i] && elmnt != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }
//     /*execute a function when someone clicks in the document:*/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
// }
