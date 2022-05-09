function zamenjajSliko(path) {
    trenutnaSlika = vrniIndeksSlike(path);
    var imgSettings = document.getElementById("accountSettingsAvatar");

    if (imgSettings != null) {
        imgSettings.src = "/images/profileAvatars/avatarOptions/profileAvatar" + trenutnaSlika + ".png";
    }
    novaSlika = true;
}

function vrniIndeksSlike(imeDatoteke) {
    var stevilke = imeDatoteke.match(/\d/g);
    stevilke = stevilke.join("");
    return parseInt(stevilke);
}

window.addEventListener("load", function () {
    
    if (imeInput && priimekInput && uporabniskoImeInput) {
        imeInput.addEventListener("input", function () {
            let ime = imeInput.value;
            let sporocilo = document.querySelector("#sporociloIme");

            if (!ime) {
                imeInput.className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno ime!";
                imeUstreznost = false;
            } else {
                imeInput.className = "form-control is-valid";
                sporocilo.innerHTML = "";
                imeUstreznost = true;
            }
        });

        priimekInput.addEventListener("input", function () {
            let priimek = priimekInput.value;
            let sporocilo = document.querySelector("#sporociloPriimek");

            if (!priimek) {
                priimekInput.className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljaven priimek!";
                priimekUstreznost = false;
            } else {
                priimekInput.className = "form-control is-valid";
                sporocilo.innerHTML = "";
                priimekUstreznost = true;
            }
        });

        uporabniskoImeInput.addEventListener("input", function () {
            let uporabniskoIme = uporabniskoImeInput.value;
            let sporocilo = document.querySelector("#sporociloUporabniskoIme");

            if (!uporabniskoIme) {
                uporabniskoImeInput.className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno uporabnisko ime!";
                uporabniskoImeUstreznost = false;
            } else {
                uporabniskoImeInput.className = "form-control is-valid";
                sporocilo.innerHTML = "";
                uporabniskoImeUstreznost = true;
            }
        });

        emailInput.addEventListener("input", function () {
            let email = emailInput.value;
            let sporocilo = document.querySelector("#sporociloEmail");

            if (!email || !validateEmail(email)) {
                emailInput.className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljaven email!";
                emailUstreznost = false;
            } else {
                emailInput.className = "form-control is-valid";
                sporocilo.innerHTML = "";
                emailUstreznost = true;
            }
        });
        gesloInputFirst.addEventListener("input", function () {
            let geslo = gesloInputFirst.value;
            let sporocilo = document.querySelector("#sporociloGesloFirst");

            if (!geslo) {
                gesloInputFirst.className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno geslo!";
                gesloUstreznost = false;
            } else {
                gesloInputFirst.className = "form-control is-valid";
                sporocilo.innerHTML = "";
                if (validatePassword(geslo)) {
                    gesloInputFirst.className = "form-control is-valid";
                    sporocilo.innerHTML = "";
                } else {
                    gesloInputFirst.className = "form-control is-invalid";
                    sporocilo.innerHTML = "Vsaj 1 velika in 1 mala črka, ter 1 številka!";
                    gesloUstreznost = false;
                }
            }
            //zgolj pri account_settingsih
            validacijaDrugegaGesla();
        });
        gesloInputSecond.addEventListener("input", function () {
            let geslo = gesloInputSecond.value;
            let sporocilo = document.querySelector("#sporociloGesloSecond");

            if (!geslo) {
                gesloInputSecond.className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno geslo!";
                gesloUstreznost = false;
            } else {
                gesloInputSecond.className = "form-control is-valid";
                sporocilo.innerHTML = "";
            }
            validacijaDrugegaGesla();
        });

        function validacijaDrugegaGesla() {
            let geslo = document.querySelector("#floatingPasswordSecond").value;
            let sporocilo = document.querySelector("#sporociloGesloSecond");

            if (!geslo) {
                document.querySelector("#floatingPasswordSecond").className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno geslo!";
                gesloUstreznost = false;
            } else {
                let prvoGeslo = document.querySelector("#floatingPasswordFirst").value;

                //a se gesli ujemata?
                if (!(prvoGeslo && !prvoGeslo.localeCompare(geslo))) {
                    document.querySelector("#floatingPasswordSecond").className = "form-control is-invalid";
                    sporocilo.innerHTML = "Gesli se ne ujemata!";
                    gesloUstreznost = false;
                }else {
                    if (validatePassword(prvoGeslo)) {
                        document.querySelector("#floatingPasswordSecond").className = "form-control is-valid";
                        sporocilo.innerHTML = "";
                        gesloUstreznost = true;
                    } else {
                        gesloInputFirst.className = "form-control is-invalid";
                        sporocilo.innerHTML = "Vsaj 1 velika in 1 mala črka, ter 1 številka!";
                        gesloUstreznost = false;
                    }
                }
            }
        }
    }
});


let imeInput = document.querySelector("#floatingInputIme");
let priimekInput = document.querySelector("#floatingInputPriimek");
let uporabniskoImeInput = document.querySelector("#floatingInputUporabniskoIme");
let emailInput = document.querySelector("#floatingInputEmail");
let gesloInputFirst = document.querySelector("#floatingPasswordFirst");
let gesloInputSecond = document.querySelector("#floatingPasswordSecond");
let gumbUrediShrani = document.querySelector("#gumbUrediShrani");
let novaSlika = false;
let prvotnaSlika = JSON.parse(sessionStorage.getItem("uporabnik")).slika;
let trenutnaSlika = prvotnaSlika;

var imeUstreznost = true;
var priimekUstreznost = true;
var uporabniskoImeUstreznost = true;
var emailUstreznost = true;
var gesloUstreznost = true;

var urejanje = false;
function urediShrani() {
    if (!urejanje) {
        omogočiVnosaPolja();
        urejanje = true;
    } else {
        var sejniUporabnik = JSON.parse(sessionStorage.getItem("uporabnik"));

        if (sejniUporabnik.ime != imeInput.value ||
            sejniUporabnik.priimek != priimekInput.value ||
            sejniUporabnik.uporabniskoIme != uporabniskoImeInput.value ||
            sejniUporabnik.email != emailInput.value ||
            sejniUporabnik.geslo != gesloInputFirst.value || novaSlika) {

            if (imeUstreznost && priimekUstreznost && uporabniskoImeUstreznost && emailUstreznost && gesloUstreznost) {
                var uporabnik = { idUporabnika: sejniUporabnik._id, ime: imeInput.value, priimek: priimekInput.value, uporabniskoIme: uporabniskoImeInput.value, email: emailInput.value.toLowerCase(), geslo: gesloInputFirst.value, slika: trenutnaSlika };
                authenticateAccountSettings(uporabnik);
            }
        } else {
            //ni bilo sprememb, samo redirect
            window.location.replace("/events?q=" + sejniUporabnik._id);
        }
    }
}

function omogočiVnosaPolja() {
    urejanjeNastavitev = true;
    imeInput.disabled = false;
    priimekInput.disabled = false;
    uporabniskoImeInput.disabled = false;
    emailInput.disabled = false;
    gesloInputFirst.disabled = false;
    gesloInputSecond.disabled = false;
    gumbUrediShrani.innerHTML = "SHRANI";
    document.querySelector("#zamenjajSliko").style.pointerEvents = "auto";
    document.querySelector("#gumbPreklici").style.display = "inline";
}

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./
    return regex.test(password);
}

if (document.querySelector("#accountSettingsForm")) {
    document.querySelector("#accountSettingsForm").addEventListener("submit", function (dogodek) {
        dogodek.preventDefault();
    });
}


function prekliciSpremembe() {
    //redirect brez shranjevanja
    var sejniUporabnik = JSON.parse(sessionStorage.getItem("uporabnik"));
    sejniUporabnik.slika = prvotnaSlika;
    sessionStorage.setItem("uporabnik", JSON.stringify(sejniUporabnik));
    window.location.replace("/events?q=" + sejniUporabnik._id);
}

function authenticateAccountSettings(uporabnikPodatki) {
    console.log("grem pogledat");
    fetch("/account_settings/authenticate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uporabnikPodatki),
    })
        .then(response => response.json())
        .then(data => {
            //uporabnik ni spremenil email ali uporabniskega imena, ali pa sta prosta
            if (!(data.emailZasedeno) && !(data.uporabniskoImeZasedeno)) {
                var sejniUporabnik = JSON.parse(sessionStorage.getItem("uporabnik"));
                sejniUporabnik.ime = uporabnikPodatki.ime;
                sejniUporabnik.priimek = uporabnikPodatki.priimek;
                sejniUporabnik.uporabniskoIme = uporabnikPodatki.uporabniskoIme;
                sejniUporabnik.email = uporabnikPodatki.email;
                sejniUporabnik.geslo = uporabnikPodatki.geslo;

                sessionStorage.setItem('uporabnik', JSON.stringify(sejniUporabnik));
                console.log(sejniUporabnik);

                var uporabnik = JSON.parse(sessionStorage.getItem("uporabnik"));
                uporabnik.slika = trenutnaSlika;
                sessionStorage.setItem("uporabnik", JSON.stringify(uporabnik));

                window.location.replace("/events?q=" + sejniUporabnik._id);
            } else {
                //email in/ali uporanisko sta zasedena
                if (data.emailZasedeno) {
                    let sporocilo = document.querySelector("#sporociloEmail");
                    document.querySelector("#floatingInputEmail").className = "form-control is-invalid";
                    sporocilo.innerHTML = "Vpisan e-mail naslov že obstaja!";
                    emailUstreznost = false;
                }
                if (data.uporabniskoImeZasedeno) {
                    let sporocilo = document.querySelector("#sporociloUporabniskoIme");
                    document.querySelector("#floatingInputUporabniskoIme").className = "form-control is-invalid";
                    sporocilo.innerHTML = "Vpisano uporabniško ime že obstaja";
                    uporabniskoImeUstreznost = false;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}