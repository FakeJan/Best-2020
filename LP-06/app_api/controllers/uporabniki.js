const mongoose = require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");
const Dogodek = mongoose.model("Dogodek");
const Chat = mongoose.model("Chat");
const nodemailer = require("nodemailer");

const pridobiUporabnike = (req, res) => {
  Uporabnik.find({ tip: "navaden" }).exec((napaka, uporabniki) => {
    if (!uporabniki) {
      return res.status(404).json({
        sporočilo: "Ne najdem uporabnikov.",
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }
    pobrisiObcutljivePodatke(uporabniki);
    res.status(200).json(uporabniki);
  });
};

//da se ne deli hash in salt
pobrisiObcutljivePodatke = (uporabniki) => {
  uporabniki.forEach(uporabnik => {
    uporabnik.nakljucnaVrednost = null;
    uporabnik.zgoscenaVrednost = null;
  });
}

// const dodajUporabnika = (req, res) => {
//   Uporabnik.create(
//     {
//       ime: req.body.ime,
//       priimek: req.body.priimek,
//       uporabniskoIme: req.body.uporabniskoIme,
//       email: req.body.email,
//       geslo: req.body.prvoGeslo,
//       slika: 1,
//     },
//     (napaka, uporabnik) => {
//       if (napaka) {
//         res.status(400).json(napaka);
//       } else {
//         res.status(201).json(uporabnik);
//       }
//     }
//   );
// };

const pridobiUporabnika = (req, res) => {
  if (!req.params.idUporabnika) {
    return res.status(404).json({
      sporočilo: "Ne najdem uporabnika, idUporabnika je obvezen parameter.",
    });
  }
  Uporabnik.findById(req.params.idUporabnika).exec((napaka, uporabnik) => {
    if (!uporabnik) {
      return res.status(404).json({
        sporočilo:
          "Ne najdem uporabnika s s podanim enoličnim identifikatorjem idUporabnika. : pridobiUporabnika",
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }
    if (uporabnik.nakljucnaVrednost && uporabnik.zgoscenaVrednost) {
      uporabnik.nakljucnaVrednost = null;
      uporabnik.zgoscenaVrednost = null;
    }
    res.status(200).json(uporabnik);
  });
};

const posodobiUporabnika = (req, res) => {
  if (!req.params.idUporabnika) {
    console.log("ne najdem idUporabnik za PUT");
    return res.status(404).json({
      sporočilo: "Ne najdem uporabnika, idUporabnika je obvezen parameter.",
    });
  }
  Uporabnik.findById(req.params.idUporabnika).exec((napaka, uporabnik) => {
    if (!uporabnik) {
      return res.status(404).json({ sporočilo: "Ne najdem uporabnika." });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }
    if (req.body.geslo) {
      uporabnik.nastaviGeslo(req.body.geslo);
    }

    (uporabnik.ime = req.body.ime),
      (uporabnik.priimek = req.body.priimek),
      (uporabnik.uporabniskoIme = req.body.uporabniskoIme),
      (uporabnik.email = req.body.email),
      (uporabnik.geslo = req.body.geslo),
      (uporabnik.slika = req.body.slika),
      uporabnik.save((napaka, uporabnik) => {
        console.log("pridobi");
        if (uporabnik.nakljucnaVrednost && uporabnik.zgoscenaVrednost) {
          uporabnik.nakljucnaVrednost = null;
          uporabnik.zgoscenaVrednost = null;
        }
        if (napaka) {
          res.status(404).json(napaka);
        } else {
          res.status(200).json(uporabnik);
        }
      });
  });
};

const odstraniUporabnika = (req, res) => {
  if (!req.params.idUporabnika) {
    return res.status(404).json({
      sporočilo: "Ne najdem uporabnika, idUporabnika je obvezen parameter.",
    });
  }
  var idUporabnika = req.params.idUporabnika;
  if (idUporabnika) {
    Uporabnik.findById(req.params.idUporabnika).exec((napaka, uporabnik) => {
      if (!uporabnik) {
        return res.status(404).json({
          sporočilo:
            "Ne najdem uporabnika s podanim enoličnim identifikatorjem idUporabnika. : pridobiUporabnika",
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      } else {
        Uporabnik.findByIdAndRemove(idUporabnika).exec((napaka) => {
          if (napaka) {
            return res.status(500).json(napaka);
          } else {
            Dogodek.deleteMany(
              {
                _id: { $in: uporabnik.created },
              },
              function (err, result) {
                if (err) {
                  return res.status(500).json(err);
                } else {
                  Chat.deleteMany(
                    { dogodekId: { $in: uporabnik.created } },
                    function (err, docs) {
                      if (err) {
                        return res.status(500).json(err);
                      } else {
                        Dogodek.updateMany(
                          { users: uporabnik._id },
                          { $pull: { users: uporabnik._id } },
                          function (err, queryRes) {
                            if (err) {
                              return res.status(500).json(err);
                            } else {
                              Uporabnik.updateMany(
                                { joined: uporabnik.created },
                                { $pull: { joined: uporabnik.created } },
                                function (err, queryRes) {
                                  if (err) {
                                    return res.status(500).json(err);
                                  } else {
                                    res.status(200).json(null);
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  }
};

//OSTALE ne-CRUD operacije
const pridobiUporabnikaEmail = (req, res) => {
  if (!req.body.email) {
    return res.status(404).json({
      sporočilo: "Email je obvezen podatek",
    });
  }
  Uporabnik.find({ email: req.body.email }).exec((napaka, uporabnik) => {
    if (!uporabnik) {
      return res.status(404).json({
        sporočilo: "Ne najdem uporabnika s podanim email naslovom",
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }
    if (uporabnik.nakljucnaVrednost && uporabnik.zgoscenaVrednost) {
      uporabnik.nakljucnaVrednost = null;
      uporabnik.zgoscenaVrednost = null;
    }
    res.status(200).json(uporabnik);
  });
};

const pridobiUporabnikaUporabniskoIme = (req, res) => {
  console.log(req.body.uporabniskoIme);
  if (!req.body.uporabniskoIme) {
    return res.status(404).json("uporabnisko ime je obvezno");
  }
  Uporabnik.find({ uporabniskoIme: req.body.uporabniskoIme }).exec(
    (napaka, uporabnik) => {
      if (!uporabnik) {
        return res.status(404).json({
          sporočilo: "Ne najdem uporabnika s podanim email naslovom",
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }
      if (uporabnik.nakljucnaVrednost && uporabnik.zgoscenaVrednost) {
        uporabnik.nakljucnaVrednost = null;
        uporabnik.zgoscenaVrednost = null;
      }
      console.log(uporabnik);
      res.status(200).json(uporabnik);
    }
  );
};
const posliPotrditveniEmail = (req, res) => {
  console.log(req.body);
  sendEmail(req, res, req.body);
};


async function sendEmail(req, res, podatkiUporabnik) {

  //console.log(__dirname);
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'goodmeetssp@gmail.com',
      pass: 'gM1.gM111'
    }
  });

  var subject = "[GoodMeets] Dobrodošli v GoodMeets " + podatkiUporabnik.ime + " " + podatkiUporabnik.priimek + "!";

  var imgSource = __dirname + "/GoodMeetsLogo.png";

  var message = {
    from: "goodmeetssp@gmail.com",
    to: podatkiUporabnik.email,
    subject: subject,
    text: "Plaintext version of the message",
    html: '<p><img src="cid:logo"/></p><p>Uspešno ste se registrirali v goodMeets.'
      + '</p><p>Kaj še čakaš? Prijavi se in poišči družbo s pomočjo naše aplikacije. To lahko storiš le z nekaj kliki!</p>',
    attachments: [{
      filename: 'image.png',
      path: imgSource,
      cid: 'logo'
    }]
  };

  mailTransporter.sendMail(message, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json();
    }
  });
}

module.exports = {
  pridobiUporabnike,
  // dodajUporabnika,
  pridobiUporabnika,
  odstraniUporabnika,
  posodobiUporabnika,
  pridobiUporabnikaEmail,
  pridobiUporabnikaUporabniskoIme,
  posliPotrditveniEmail
};
