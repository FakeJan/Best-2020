const passport = require('passport');
const LokalnaStrategija = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('Uporabnik');


passport.use(

new LokalnaStrategija(
        {
            usernameField: 'email',
            passwordField: 'geslo'
        },
        (uporabniskoIme, geslo, pkKoncano) => {
            Uporabnik.findOne(
                { email: uporabniskoIme },
                (napaka, uporabnik) => {
                    console.log(uporabniskoIme);
                    console.log("v Passport");

                    if (napaka) {
                        console.log("Napak v passportu");
                        return pkKoncano(napaka);
                    }

                    if (!uporabnik) {
                        return pkKoncano(null, false, {
                            'sporočilo': "Napačno uporabniško ime"
                        });
                    }
                    if (!uporabnik.preveriGeslo(geslo)) {
                        return pkKoncano(null, false, {
                            "sporočilo": "Napačno geslo"
                        });
                    }
                    return pkKoncano(null, uporabnik);
                }
            );
        }
    )
);