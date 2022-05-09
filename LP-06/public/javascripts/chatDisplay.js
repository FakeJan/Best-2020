$(document).ready(function () {
    var elements = document.getElementsByClassName("stranskiDogodki");

    var myFunction = function () {
        var user = JSON.parse(sessionStorage.getItem("uporabnik"));
        var attribute = this.getAttribute("id");
        window.location.replace("../event_chat/" + user._id + "?eventId=" + attribute);
    };

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', myFunction, false);
    }


    var objDiv = document.getElementById("chatScroll");
    if (objDiv)
        objDiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });

    let search = document.querySelector("#searchEvents");
    let searchClear = document.querySelector("#searchEventsClear");
    let searchSide = document.querySelector("#searchEventsSide");
    let searchClearSide = document.querySelector("#searchEventsClearSide");

    if (search != null) {
        search.addEventListener("input", function (dogodek) {
            searchDogodki();
        });
        searchClear.addEventListener('click', () => {
            search.value = null;
            searchSide.value = null;
            var events = document.body.getElementsByClassName("stranskiDogodki");
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                event.style.display = 'block'
            }
        })
    }


    if (searchSide != null) {
        searchSide.addEventListener("input", function (dogodek) {
            searchDogodki();
        });
        searchClearSide.addEventListener('click', () => {
            search.value = null;
            searchSide.value = null;
            var events = document.body.getElementsByClassName("stranskiDogodki");
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                event.style.display = 'block'
            }
        })
    }
});

function loadChat() {
    var user = JSON.parse(sessionStorage.getItem("uporabnik"));

    window.location.replace("../../event_chat/" + user._id);

}

function onEnterTextKeyDown(chatId) {
    if (window.event.key === 'Enter') {
        var user = JSON.parse(sessionStorage.getItem("uporabnik"));
        updateChat(user._id, chatId);
    }
}

function updateChat(currentUserId, chatId) {
    var sporocilo = document.getElementById("chatMessage");


    if (!chatId) {
        alert("Ni izbranega pogovora.");
        sporocilo.value = null;
    }

    var chat = {
        "vsebina": sporocilo.value,
        "userId": currentUserId
    }

    fetch("/event_chat/" + chatId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chat)
    }).then(res => {
        if (res.status < 400) {
            document.location.reload();
            sporocilo.value = null;
        } else {
            res.json().then(data => {
                // alert(data.sporočilo);
                // alert(data.sporočilo);
                sporocilo.value = null;
            });
        }
    }).catch(error => {
        console.log(error);
    });

}

function deleteMessage(chatId, messageId) {
    fetch("../../event_chat/" + chatId + "/message/" + messageId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status < 400) {
            document.location.reload();
            sporocilo.value = null;
        } else {
            res.json().then(data => {
                alert(data.sporočilo);
            });
            document.location.reload();
        }
    }).catch(error => {
        console.log(error);
    });
}

function searchDogodki() {
    var search = document.getElementById("searchEvents");
    var searchSide = document.getElementById("searchEventsSide");
    var searchValue;
    var side = document.getElementById("main-sidebar-container");

    if (!side.classList.contains("show")) {
        searchValue = search.value;
        searchSide.value = searchValue;
    } else {
        searchValue = searchSide.value;
        search.value = searchValue;
    }

    var events = document.body.getElementsByClassName("stranskiDogodki");
    removeSearch(events);

    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var eventTitle = events[i].getElementsByClassName("name")[0].firstChild.textContent.toLowerCase();
        var regex = new RegExp(searchValue.toLowerCase());
        if (!regex.test(eventTitle)) {
            event.style.display = 'none';
        } else {
            event.style.display = 'block'
        }
    }
}

function removeSearch(events) {
    for (var i = 0; i < events.length; i++) {
        events[i].style.display = "none";
    }
}