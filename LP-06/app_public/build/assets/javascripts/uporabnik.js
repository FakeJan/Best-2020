window.addEventListener("load", function () {
    //PRIJAVA
    let emailUstrezno = false;
    let gesloUstrezno = false;

    let prijavaForm = document.querySelector("#prijavaForm");
    if (prijavaForm) {
        let emailInput = document.querySelector("#floatingEmail");
        let gesloInput = document.querySelector("#floatingPassword");

        //KLIK NA GUMB PRIJAVI SE
        prijavaForm.addEventListener("submit", function (dogodek) {

            let email = document.querySelector("#floatingEmail").value.toLowerCase();
            let geslo = document.querySelector("#floatingPassword").value;

            dogodek.preventDefault();

            if (emailUstrezno && gesloUstrezno) {
                authenticateLogin(email, geslo);
            }
            if(!emailUstrezno){
                preveriEmailPrijava();
            }
            if(!gesloUstrezno){
                preveriGesloPrijava();
            }
        });

        //TODO kaj je boljse za email? input and change ???
        emailInput.addEventListener("input", function () {
            preveriEmailPrijava();
        });
        function preveriEmailPrijava(){
            let email = document.querySelector("#floatingEmail").value;
            let sporocilo = document.querySelector("#sporociloEmail");
            if (!email || !validateEmail(email)) {
                document.querySelector("#floatingEmail").className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljaven email!";
                emailUstrezno = false;
            } else {
                document.querySelector("#floatingEmail").className = "form-control is-valid";
                sporocilo.innerHTML = "";
                emailUstrezno = true;
            }
        }
        gesloInput.addEventListener("input", function () {
            preveriGesloPrijava();
        });
        function preveriGesloPrijava(){
            let geslo = document.querySelector("#floatingPassword").value;
            let sporocilo = document.querySelector("#sporociloPassword");

            if (!geslo) {
                document.querySelector("#floatingPassword").className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno geslo!";
                gesloUstrezno = false;
            } else {
                document.querySelector("#floatingPassword").className = "form-control is-valid";
                sporocilo.innerHTML = "";
                gesloUstrezno = true;
            }
        }
    }

    //REGISTRACIJA
    var imeUstreznost = false;
    var priimekUstreznost = false;
    var uporabniskoImeUstreznost = false;
    var emailUstreznost = false;
    var gesloUstreznost = false;

    let registracijaForm = document.querySelector("#registracijaForm");
    if (registracijaForm) {
        let imeInput = document.querySelector("#floatingInputIme");
        let priimekInput = document.querySelector("#floatingInputPriimek");
        let uporabniskoImeInput = document.querySelector("#floatingInputUporabniskoIme");
        let emailInput = document.querySelector("#floatingInputEmail");
        let gesloInputFirst = document.querySelector("#floatingPasswordFirst");
        let gesloInputSecond = document.querySelector("#floatingPasswordSecond");

        //KLIK NA GUMN REGISTRIRAJ SE
        registracijaForm.addEventListener("submit", function (dogodek) {
            if (imeUstreznost && priimekUstreznost && uporabniskoImeUstreznost && emailUstreznost && gesloUstreznost) {
                var podatkiRegistracija = { ime: imeInput.value, priimek: priimekInput.value, uporabniskoIme: uporabniskoImeInput.value, email: emailInput.value.toLowerCase(), geslo: gesloInputFirst.value };
                authenticateRegistration(podatkiRegistracija);
            }
            //ce uporabnik odda prazna polja
            if(!imeUstreznost){
                preveriIme();
            }if(!priimekUstreznost){
                preveriPriimek();
            }if(!uporabniskoImeUstreznost){
                preveriUporabniskoIme();
            }if(!emailUstreznost){
                preveriEmail();
            }if(!gesloUstreznost){
                preveriPrvoGeslo();
                validacijaDrugegaGesla();
            }
            dogodek.preventDefault();
        });

        imeInput.addEventListener("input", function () {
            preveriIme();
        });
        function preveriIme(){
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
        }

        priimekInput.addEventListener("input", function () {
            preveriPriimek();
        });
        function preveriPriimek(){
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
        }

        uporabniskoImeInput.addEventListener("input", function () {
            preveriUporabniskoIme();
        });
        function preveriUporabniskoIme(){
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
        }

        emailInput.addEventListener("input", function () {
            preveriEmail();
        });
        function preveriEmail(){
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
        }

        gesloInputFirst.addEventListener("input", function () {
            preveriPrvoGeslo();
        });
        function preveriPrvoGeslo(){
            let geslo = document.querySelector("#floatingPasswordFirst").value;
            let sporocilo = document.querySelector("#sporociloGesloFirst");

            if (!geslo) {
                document.querySelector("#floatingPasswordFirst").className = "form-control is-invalid";
                sporocilo.innerHTML = "Neveljavno geslo!";
                gesloUstreznost = false;
            } else {
                if(validatePassword(geslo)){
                    document.querySelector("#floatingPasswordFirst").className = "form-control is-valid";
                    sporocilo.innerHTML = "";
                }else{
                    document.querySelector("#floatingPasswordFirst").className = "form-control is-invalid";
                    sporocilo.innerHTML = "Vsaj 1 velika in 1 mala črka, ter 1 številka!";
                    gesloUstreznost = false;
                }
            }
        }

        gesloInputSecond.addEventListener("input", function () {
            validacijaDrugegaGesla();

            //ce uporabnik vpise prvo geslo, nato drugo, ter spet prvo spremeni.
            gesloInputFirst.addEventListener("input", function () {
                validacijaDrugegaGesla();
            });
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
                } else {
                    //geslo je ustrezno, ce je prvo
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

    function authenticateLogin(email, geslo) {
        var podatki = { email: email, geslo: geslo };

        fetch("/login/authenticate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(podatki),
        })
            .then(response => response.json())
            .then(data => {
                if (data.length == 1) {
                    sessionStorage.setItem('uporabnik', JSON.stringify(data[0]));
                    window.location.replace("/events?q=" + data[0]._id);
                } else {
                    let sporocilo = document.querySelector("#sporociloEmail");
                    document.querySelector("#floatingEmail").className = "form-control is-invalid";
                    sporocilo.innerHTML = "Vpisan e-mail naslov ne obstaja!";
                    emailUstrezno = false;
                }
            })
            .catch((error) => {
                // console.log(error);
            });
    }
});

function authenticateRegistration(registracijaPodatki) {
    fetch("/signup/authenticate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registracijaPodatki),
    })
        .then(response => response.json())
        .then(data => {
            if (!(data.emailZasedeno) && !(data.uporabniskoImeZasedeno)) {
                //email and user are free to use, user was added
                let uporabnik = {
                    _id: data._id,
                    ime: registracijaPodatki.ime,
                    priimek: registracijaPodatki.priimek,
                    uporabniskoIme: registracijaPodatki.uporabniskoIme,
                    email: registracijaPodatki.email,
                    geslo: registracijaPodatki.geslo,
                    slika: 1
                };
                if(sessionStorage.getItem("uporabnik")!=null){
                    console.log("trenutno obstaja v seji drug shranjej uporabnik");
                    sessionStorage.removeItem("uporabnik");
                }
                sessionStorage.setItem('uporabnik', JSON.stringify(uporabnik));

                //REDIRECT?
                window.location.replace("/events?q=" + uporabnik._id);

                posliEmail(registracijaPodatki);
            } else {
                //uporabnika ni mogoce dodati
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
                    emailUstreznost = false;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePassword(password){
    var regex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./
    return regex.test(password);
}
function posliEmail(podatki){
    var checked = document.querySelector("#posliEmailPotrdilo").checked;
    if(checked){
        fetch("/signup/email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(podatki),
        })
            .then(data => {
               console.log("uspesno poslan email");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
