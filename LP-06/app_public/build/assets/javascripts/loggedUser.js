if (sessionStorage.getItem("uporabnik") != null) {
    //nastavimo ime in sliko prijavljenega uporabnika
    var uporabnik = JSON.parse(sessionStorage.getItem("uporabnik"));

    var imePriimek = document.querySelector("#uporabnikImePriiimek");
    var img = document.getElementById("userAvatar");

    if (imePriimek != null && img != null) {
        imePriimek.innerHTML = uporabnik.ime + " " + uporabnik.priimek;
        img.src = "/images/profileAvatars/avatarOptions/profileAvatar" + uporabnik.slika + ".png";
    }
}

function account_settings(){
    var uporabnik = JSON.parse(sessionStorage.getItem("uporabnik"));
    window.location.replace("/account_settings?q="+uporabnik._id);    
}

function izpisUporabnika(){
    sessionStorage.removeItem("uporabnik");
    console.log("Odjava uporabnika");
}
