var apiParametri = {
    streznik: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
    apiParametri.streznik = "https://goodmeets.herokuapp.com/";
}
const axios = require("axios").create({
    baseURL: apiParametri.streznik,
    timeout: 5000,
});

const homepage = (req, res) => {
    res.render("homepage", {
        title: "Homepage",
        layout: 'homepageLayout'
    });
};

const login = (req, res) => {
    res.render("login", {
        title: "Prijava",
        layout: 'layoutSecondary',
        chat: false,
        admin: false,
        adminDogodki: false
    });
};

const loginAuthentication = (req, res) => {
    //vrni uporabnika glede na email, ce obstaja
    if (req.body.email != null) {
        axios.post("api/uporabniki/prijava",
            req.body = {
                email: req.body.email
            }
        ).then(odgovor => {
            res.status(200).json(odgovor.data);
        })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
};

const signup = (req, res) => {
    res.render("signup", {
        title: "Registracija",
        layout: 'layoutSecondary',
        chat: false,
        admin: false,
        adminDogodki: false
    });
};
const signupAuthentication = (req, res) => {
    signupOrChangeAuthentication(req, res, true);
}
const changeSettingsAuthentication = (req, res) => {
    signupOrChangeAuthentication(req, res, false);
}

const signupOrChangeAuthentication = (req, res, signup) => {
    var podatkiUporabnik = req.body;
    var podatki = { emailZasedeno: false, uporabniskoImeZasedeno: false };//po default ne obstajata

    if (!(!podatkiUporabnik.ime || !podatkiUporabnik.priimek || !podatkiUporabnik.uporabniskoIme || !podatkiUporabnik.email)) {
        axios.post("api/uporabniki/prijava",
            req.body = {
                email: podatkiUporabnik.email
            }
        ).then(odgovor1 => {
            if (!odgovor1) {
                res.status(404).json("Napaka pri iskanju emaila");
            }
            if (odgovor1.data.length > 0) {
                if (signup) {
                    podatki.emailZasedeno = true;
                } else {
                    //spreminjanje acc_settings
                    if (!(podatkiUporabnik.idUporabnika == odgovor1.data[0]._id)) {
                        podatki.emailZasedeno = true;
                    }
                }
            }
            //preveri se za uporabniskoIme
            axios.post("api/uporabniki/registracija",
                req.body = {
                    uporabniskoIme: podatkiUporabnik.uporabniskoIme
                }
            ).then(odgovor2 => {
                if (!odgovor2) {
                    res.status(404).json("Napaka pri iskanju po uporabniskem imenu");
                }
                if (odgovor2.data.length > 0) {
                    if (signup) {
                        podatki.uporabniskoImeZasedeno = true;
                        res.status(200).json(podatki);
                        res.end();
                    } else {

                        if (!(podatkiUporabnik.idUporabnika == odgovor2.data[0]._id)) {
                            podatki.uporabniskoImeZasedeno = true;
                            res.status(200).json(podatki);
                            res.end();
                        }
                    }
                }

                if (!signup && !podatki.uporabniskoImeZasedeno && !podatki.emailZasedeno) {

                    axios.put("api/uporabniki/" + podatkiUporabnik.idUporabnika,
                        req.body = podatkiUporabnik
                    ).then(odgovor4 => {
                        if (!odgovor4) {
                            res.status(400).json("Napaka pri posodobitve uporabnika");
                        }
                        res.status(200).json(podatki);
                    })
                        .catch((error) => {
                            console.log("error pri axiosu na strani serverja");
                            res.status(500).json({});
                        });

                } else if (signup && !podatki.uporabniskoImeZasedeno && !podatki.emailZasedeno) {

                    axios.post("api/uporabniki",
                        req.body = podatkiUporabnik
                    ).then(odgovor3 => {
                        if (!odgovor3) {
                            res.status(400).json(error);
                        }
                        podatki._id = odgovor3.data._id;
                        res.status(200).json(podatki);
                        res.end();
                    })
                        .catch((error) => {
                            console.log(error);
                        });

                } else {
                    res.status(200).json(podatki);
                    res.end();
                }
            })
                .catch((error) => {
                    res.status(500).json(error);
                    res.end();
                });

        }).catch((error) => {
            res.status(500).json(error);
            res.end();
        });
    }

};

const signupEmail = (req, res) => {
    try {
        var podatkiUporabnik = req.body;
        sendEmail(podatkiUporabnik);
        res.status(200).json();
    } catch (err) {
        res.status(400).json();
    }
};

// async function sendEmail(podatkiUporabnik) {
//     let mailTransporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'goodmeetssp@gmail.com',
//             pass: 'gM1.gM111'
//         }
//     });

//     var subject = "[GoodMeets] Dobrodošli v GoodMeets " + podatkiUporabnik.ime + " " + podatkiUporabnik.priimek + "!";

//     var imgSource = apiParametri.streznik + "/images/GoodMeetsLogo.png";

//     var message = {
//         from: "goodmeetssp@gmail.com",
//         to: podatkiUporabnik.email,
//         subject: subject,
//         text: "Plaintext version of the message",
//         html: '<p><img src="cid:logo"/></p><p>Uspešno ste se registrirali v goodMeets.'
//             + '</p><p>Kaj še čakaš? Prijavi se in poišči družbo s pomočjo naše aplikacije. To lahko storiš le z nekaj kliki!</p>',
//         attachments: [{
//             filename: 'image.png',
//             path: imgSource,
//             cid: 'logo'
//         }]
//     };

//     mailTransporter.sendMail(message, function (err, data) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

const accountSettings = (req, res) => {
    if (req.query.q) {
        axios
            .get("/api/uporabniki/" + req.query.q)
            .then((odgovor) => {
                accountSettingsRender(req, res, odgovor.data);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
};

const accountSettingsRender = (req, res, uporabnik) => {
    res.render("account_settings", {
        title: "Nastavitve",
        ime: uporabnik.ime,
        priimek: uporabnik.priimek,
        uporabniskoIme: uporabnik.uporabniskoIme,
        email: uporabnik.email,
        geslo: uporabnik.geslo,
        slika: uporabnik.slika
    });
};

const adminDogodki = (req, res) => {
    //validacija ni potrebna
    axios
        .get("/api/dogodki/")
        .then((odgovor) => {
            if (odgovor) {
                adminDogodkiRender(req, res, odgovor.data);
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};

const adminDogodkiRender = (req, res, data) => {
    res.render("admin_dogodki", {
        title: "ADMIN-pregled dogodkov",
        layout: 'layoutSecondary',
        events: data.events,
        dogodki: true,
        chat: false,
        admin: true,
        adminDogodki: true
    });
};

const adminUporabniki = (req, res, uporabnik) => {
    //validacija ni potrebna
    axios
        .get("/api/uporabniki")
        .then((odgovor) => {
            adminUporabnikiRender(req, res, odgovor.data);
        });
};

const adminUporabnikiRender = (req, res, uporabniki) => {
    res.render("admin_uporabniki", {
        title: "ADMIN-pregled uporabnikov",
        layout: 'layoutSecondary',
        uporabniki: uporabniki,
        dogodki: false,
        chat: false,
        admin: true,
        adminDogodki: false
    });
};

// const showError = (req, res, e) => {
//     let title = "Something went wrong!"
//     let message = e.isAxiosError ? "Error when trying to access the database" : undefined;
//     message =
//         message != undefined && e.response && e.response.data["message"] ? e.response.data["message"] : message;
//     message =
//         message == undefined ? "Something went wrong." : message;
//     res.render("error", {
//         title: title,
//         message: message,
//         error: e,
//         status: e.response.status
//     });
// }

const deleteUser = (req, res) => {
    if (req.params.id) {
        axios.delete("api/uporabniki/" + req.params.id).then((odgovor) => {
            res.end();
        });
    }
}

const db = (req, res) => {
    res.render("db", {
        title: "GoodMeets_db",
        layout: false
    });
}

const dbVnos = (req, res) => {
    //validacija ni potrebna
    axios.get("api/db/podatki/vnos")
        .then(odgovor => {
            if (!odgovor || odgovor.status != 201) {
                res.status(400).json("Napaka pri dostopu na API");
            } else {
                res.status(201).json(odgovor.status);
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

const dbOdstranitev = (req, res) => {
    //validacija ni potrebna
    axios.get("api/db/podatki/odstranitev")
        .then(odgovor => {
            if (!odgovor || odgovor.status != 204) {
                res.status(400).json("Napaka pri dostopu na API");
            } else {
                res.status(204).json(odgovor.status);
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}

module.exports = {
    homepage,
    login,
    signup,
    accountSettings,
    adminDogodki,
    adminUporabniki,
    loginAuthentication,
    signupAuthentication,
    changeSettingsAuthentication,
    deleteUser,
    db,
    dbVnos,
    dbOdstranitev,
    signupEmail
};
