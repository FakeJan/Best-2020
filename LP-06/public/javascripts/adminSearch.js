window.addEventListener("load", function () {
    let search = document.querySelector("#searchAdmin");
    if(search!=null){
        search.addEventListener("input", function (dogodek) {
            if(/admin_dogodki/.test(window.location.href)){
                //admin_dogodki
                searchAdminDogodki();
            }else{
                //admin_uporabniki
                searchAdminUporabniki();
            }
        });
    }
});
function searchAdminDogodki() {
    var searchValue = document.getElementById("searchAdmin").value;
    var events = document.body.getElementsByClassName("event");
    removeSearch(events);

    for (var i = 0; i < events.length; i++) {           
        var event = events[i];
        var eventTitle = events[i].getElementsByClassName("card-title")[0].firstChild.textContent.toLowerCase();
        var regex = new RegExp(searchValue.toLowerCase());
        if(!regex.test(eventTitle)){
            event.style.display = 'none';
        }else{
            event.style.display = 'block'
        }
    }
}

function searchAdminUporabniki() {
    var searchValue = document.getElementById("searchAdmin").value;
    var uporabniki = document.body.getElementsByClassName("uporabniki");
    removeSearch(uporabniki);

    for (var i = 0; i < uporabniki.length; i++) {           
        var uporabnik = uporabniki[i];
        var iskalnoPodrocje = uporabnik.querySelector("#uporabnikImePriimek").innerHTML;
        iskalnoPodrocje=iskalnoPodrocje.concat(uporabnik.querySelector("#uporabnikUporabniskoIme").innerHTML)
        .concat(uporabnik.querySelector("#uporabnikEmail").innerHTML)
        .concat(uporabnik.querySelector("#uporabnik_id").innerHTML);
        iskalnoPodrocje=iskalnoPodrocje.toLowerCase();
        
        var regex = new RegExp(searchValue.toLowerCase());
        if(!regex.test(iskalnoPodrocje)){
            uporabnik.style.display = 'none';
        }else{
            uporabnik.style.display = 'block'
        }
    }
}

function removeSearch(events) {
    for (var i = 0; i < events.length; i++) {
        events[i].style.display = "none";
    }
}