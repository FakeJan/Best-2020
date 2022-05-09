const passport = require("passport");
const mongoose = require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");

const registracija = (req, res) => {
  //console.log(req.body);
  if (
    !req.body.ime ||
    !req.body.priimek ||
    !req.body.uporabniskoIme ||
    !req.body.email ||
    !req.body.prvoGeslo
  )
    return res.status(400).json({ sporočilo: "Zahtevani so vsi podatki." });

  const uporabnik = new Uporabnik();
  uporabnik.ime = req.body.ime;
  uporabnik.priimek = req.body.priimek;
  uporabnik.uporabniskoIme = req.body.uporabniskoIme;
  uporabnik.email = req.body.email;
  uporabnik.nastaviGeslo(req.body.prvoGeslo);
  uporabnik.save((napaka) => {
    uporabnik.nakljucnaVrednost = null;
    uporabnik.zgoscenaVrednost = null;
    if (napaka) res.status(500).json(napaka);
    else res.status(200).json({ uporabnik: uporabnik, zeton: uporabnik.generirajJwt() });
  });
};

const prijava = (req, res) => {
  if (!req.body.email || !req.body.geslo)
    return res.status(400).json({ sporočilo: "Zahtevani so vsi podatki." });

  passport.authenticate("local", (napaka, uporabnik, informacije) => {
    if (napaka) return res.status(500).json(napaka);
    uporabnik.nakljucnaVrednost = null;
    uporabnik.zgoscenaVrednost = null;
    if (uporabnik) res.status(200).json({ uporabnik: uporabnik, zeton: uporabnik.generirajJwt() });
    else res.status(401).json(informacije);
  })(req, res);
};

module.exports = {
  registracija,
  prijava,
};
