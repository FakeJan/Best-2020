const mongoose = require("mongoose");
const { events } = require("../../app_server/controllers/events");
const Dogodek = mongoose.model("Dogodek");
const Uporabnik = mongoose.model("Uporabnik");
const Chat = mongoose.model("Chat");

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const dogodkiPreberiVse = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Dogodek.countDocuments({}, function (err, count) {
    if (err) {
      return res.status(500).json(err);
    } else {
      Dogodek.find()
        .skip(offset)
        .limit(limit)
        .exec((napaka, dogodki) => {
          if (!dogodki) {
            return res
              .status(404)
              .json({
                sporočilo:
                  "Ne najdem dogodkov."
              });
          } else if (napaka) {
            return res.status(500).json(napaka);
          } else {
            // if (req.query.userId) {
            //   Uporabnik.findById(req.query.userId).exec((napaka, uporabnik) => {
            //     if (!uporabnik) {
            //       return res.status(404).json({
            //         sporočilo:
            //           "Ne najdem uporabnika s s podanim enoličnim identifikatorjem idUporabnika. : dogodkiPreberiVse",
            //       });
            //     } else if (napaka) {
            //       return res.status(500).json(napaka);
            //     } else {
            //       res.status(200).json({ user: uporabnik, events: dogodki, totalEvents: count });
            //     }
            //   });
            // } else {
            res.status(200).json({ events: dogodki, totalEvents: count });
            // }
          }
        })
    }
  });
};

const dogodkiKreiraj = (req, res) => {
  if (!req.body.userId) {
    return res.status(404).json({
      sporočilo: "Ne najdem uporabnika, idUporabnika je obvezen parameter.",
    });
  }

  var event = req.body.event;

  Dogodek.create(
    {
      title: event.title,
      eventImage: event.eventImage,
      city: event.city,
      address: event.address,
      coordinates: [parseFloat(event.coordinates[0]), parseFloat(event.coordinates[1])],
      date: event.date,
      description: event.description,
      tags: event.tags,
      participantMax: event.participantMax,
      users: [
        req.body.userId
      ]
    },
    (napaka, dogodek) => {
      if (napaka) {
        res.status(400).json(napaka);
      } else {

        Uporabnik.findById(req.body.userId)
          .exec((napaka, uporabnik) => {
            if (!uporabnik) {
              return res.status(404).json({ sporočilo: "Ne najdem uporabnika." });
            } else if (napaka) {
              return res.status(500).json(napaka);
            } else if (!uporabnik.created.addToSet(dogodek._id)[0]) {
              res.status(500).json({ sporočilo: "Duplikat" });
            }

            uporabnik.save((napaka, uporabnik) => {
              if (napaka) {
                res.status(404).json(napaka);
              } else {
                Chat.create(
                  {
                    dogodekId: dogodek._id,
                    zadnjaAktivnost: "",
                    sporocila: []
                  },
                  (napaka, chat) => {
                    if (napaka) {
                      res.status(400).json(napaka);
                    } else {
                      res.status(201).json(dogodek);
                    }
                  }
                )

              }
            });
          });
      }
    }
  );
};

const dogodkiPreberiIzbranega = (req, res) => {
  Dogodek.findById(req.params.idDogodki).exec((napaka, dogodek) => {
    if (!dogodek) {
      return res
        .status(404)
        .json({
          sporočilo:
            "Ne najdem dogodka s podanim enoličnim identifikatorje idDogodki."
        });
    } else if (napaka) {
      return res.status(500).json(napaka);
    }
    res.status(200).json(dogodek);
  });
};

const dogodkiPosodobiIzbranega = (req, res) => {
  if (!req.params.idDogodki) {
    return res.status(404).json({
      sporočilo: "Ne najdem dogodka, id je obvezen parameter.",
    });
  }

  var event = req.body;

  Dogodek.findById(req.params.idDogodki)
    .exec((napaka, dogodek) => {
      if (!dogodek) {
        return res.status(404).json({ sporočilo: "Ne najdem dogodka." });
      } else if (napaka) {
        return res.status(500).json(napaka);
      } else if (event.participantMax != 0 && dogodek.users.length > event.participantMax) {
        return res.status(400).json({ sporočilo: "Neveljavna omejitev dogodka." });
      }

      dogodek.title = event.title,
        dogodek.eventImage = event.eventImage,
        dogodek.city = event.city,
        dogodek.address = event.address,
        dogodek.coordinates = [parseFloat(event.coordinates[0]), parseFloat(event.coordinates[1])],
        dogodek.date = event.date,
        dogodek.description = event.description,
        dogodek.tags = event.tags,
        dogodek.participantMax = event.participantMax

      dogodek.save((napaka, dogodek) => {
        if (napaka) {
          console.log(napaka);
          res.status(404).json(napaka);
        } else {
          res.status(200).json(dogodek);
        }
      });
    });
};

const dogodkiIzbrisiIzbranega = (req, res) => {
  if (!req.params.idDogodki) {
    return res.status(404).json({
      sporočilo: "Ne najdem dogodka, id je obvezen parameter.",
    });
  }
  var eventId = req.params.idDogodki;
  if (eventId) {
    var oid = new mongoose.Types.ObjectId(eventId);

    Dogodek.findByIdAndRemove(eventId).exec((napaka) => {
      if (napaka) {
        return res.status(500).json(napaka);
      } else {
        Uporabnik.updateMany(
          { "$or": [{ joined: oid }, { created: oid }] },
          { "$pull": { joined: oid, created: oid } },
          function (err, docs) {
            if (err) {
              return res.status(500).json(err);
            } else {
              Chat.deleteOne(
                { dogodekId: eventId },
                function (err, docs) {
                  if (err) {
                    return res.status(500).json(err);
                  } else {
                    res.status(200).json(null);
                  }
                });
            }
          });
      }
    });

  } else {
    res.status(404).json({
      sporočilo: "Ne najdem dogodka, id je obvezen parameter.",
    });
  }
};

const dogodkiPreberiUstvarjene = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Uporabnik.findById(req.params.id).exec((napaka, uporabnik) => {
    if (!uporabnik) {
      return res.status(404).json({
        sporočilo:
          "Ne najdem uporabnika s podanim enoličnim identifikatorjem idUporabnika. : dogodkiPreberiUstvarjene" + uporabnik,
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    } else {
      var oids = [];
      uporabnik.created.forEach(function (id) {
        oids.push(new mongoose.Types.ObjectId(id));
      });

      Dogodek.countDocuments({ _id: { $in: oids } }, function (err, count) {
        if (err) {
          return res.status(500).json(err);
        } else {
          Dogodek.find({ _id: { $in: oids } })
            .skip(offset)
            .limit(limit)
            .exec((napaka, dogodki) => {

              if (!dogodki) {
                return res
                  .status(404)
                  .json({
                    sporočilo:
                      `Ne najdem dogodkov s podanim enoličnim identifikatorji: ${JSON.stringify(req.body.ids)})`
                  });
              } else if (napaka) {
                return res.status(500).json(napaka);
              }
              return res.status(200).json({ events: dogodki, totalEvents: count });
            });
        }
      })
    }
  });

}

const dogodkiPreberiPridruzene = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Uporabnik.findById(req.params.id).exec((napaka, uporabnik) => {
    if (!uporabnik) {
      return res.status(404).json({
        sporočilo:
          "Ne najdem uporabnika s s podanim enoličnim identifikatorjem idUporabnika. : dogodkiPreberiPridruzene",
      });
    } else if (napaka) {
      return res.status(500).json(napaka);
    } else {
      var oids = [];
      uporabnik.joined.forEach(function (id) {
        oids.push(new mongoose.Types.ObjectId(id));
      });
      Dogodek.countDocuments({ _id: { $in: oids } }, function (err, count) {
        if (err) {
          return res.status(500).json(err);
        } else {
          Dogodek.find({ _id: { $in: oids } })
            .skip(offset)
            .limit(limit)
            .exec((napaka, dogodki) => {

              if (!dogodki) {
                return res
                  .status(404)
                  .json({
                    sporočilo:
                      `Ne najdem dogodkov s s podanim enoličnim identifikatorji: ${JSON.stringify(req.body.ids)})`
                  });
              } else if (napaka) {
                return res.status(500).json(napaka);
              }
              return res.status(200).json({ events: dogodki, totalEvents: count });
            });
        }
      })
    }
  });
  ;

}

//TODO: WRAP IN TRANSACTION, also both of these are called independently, is weird
const dogodkiPridruziUporabnika = (req, res) => {
  var userId = req.body.userId;
  var eventId = req.body.eventId;

  console.log(userId);
  console.log(eventId);
  console.log("greetings");

  Dogodek.findById(eventId).exec((napaka, dogodek) => {
    if (!dogodek) {
      res.status(404).json({ sporočilo: "Ne najdem dogodka." });
    } else if (napaka) {
      res.status(500).json(napaka);
    } else if (dogodek.participantMax != 0 && dogodek.users.length >= dogodek.participantMax) {
      res.status(400).json({ sporočilo: "Dogodek je poln." });
    } else if (!dogodek.users.addToSet(userId)[0]) {
      res.status(400).json({ sporočilo: "Uporabnik ze pripada tem dogodku." });
    } else {
      dogodek.save((napaka, dogodek) => {
        if (napaka) {
          res.status(404).json(napaka);
        } else {
          Uporabnik.findById(userId).exec((napaka, uporabnik) => {
            if (!uporabnik) {
              res.status(404).json({ sporočilo: "Ne najdem uporabnika." });
            } else if (napaka) {
              res.status(500).json(napaka);
            } else if (!uporabnik.joined.addToSet(eventId)[0]) {
              res.status(400).json({ sporočilo: "Uporabnik ze pripada tem dogodku v2." });
            } else {
              uporabnik.save((napaka, uporabnik) => {
                if (napaka) {
                  res.status(404).json(napaka);
                } else {
                  return res.status(200).json(dogodek);
                }
              });
            }
          });
        }
      });
    }
  });
}

const dogodkiOdstraniUporabnika = (req, res) => {
  var userId = req.body.userId;
  var eventId = req.body.eventId;


  Dogodek.findById(eventId).exec((napaka, dogodek) => {
    if (!dogodek) {
      res.status(404).json({ sporočilo: "Ne najdem dogodka." });
    } else if (napaka) {
      res.status(500).json(napaka);
    }
    dogodek.users.pull({ _id: userId });

    dogodek.save((napaka, dogodek) => {
      if (napaka) {
        res.status(404).json(napaka);
      } else {
        Uporabnik.findById(userId).exec((napaka, uporabnik) => {
          if (!uporabnik) {
            res.status(404).json({ sporočilo: "Ne najdem uporabnika." });
          } else if (napaka) {
            res.status(500).json(napaka);
          }

          uporabnik.joined.pull({ _id: eventId })

          uporabnik.save((napaka, uporabnik) => {
            if (napaka) {
              res.status(404).json(napaka);
            } else {
              return res.status(200).json(dogodek);
            }
          });
        });
      }
    });
  });
}

const dogodkiSeznamPoRazdalji = (req, res) => {
  const chategory = req.query.chategory; // kau ne rabm al neki
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const razdalja = parseFloat(req.query.razdalja);
  const start = new Date(req.query.startDate);
  const end = new Date(req.query.endDate);
  var reg = new RegExp(chategory, 'i');

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  if (!lng || !lat) {
    Dogodek.aggregate([
      { $addFields: { results: { $regexMatch: { input: "$title", regex: reg } } } },
      { $match: { results: true } },
      { $match: { "date": { "$gt": start } } },
      { $match: { "date": { "$lt": end } } },
      { $count: "count" }
    ])
      .exec((napaka, count) => {
        if (napaka) {

        } else
          Dogodek.aggregate([
            { $addFields: { results: { $regexMatch: { input: "$title", regex: reg } } } },
            { $match: { results: true } },
            { $match: { "date": { "$gt": start } } },
            { $match: { "date": { "$lt": end } } }
          ])
            .skip(offset)
            .limit(limit)
            .exec((napaka, dogodki) => {
              if (!dogodki) {
                return res
                  .status(404)
                  .json({
                    sporočilo:
                      "Ne najdem dogodkov."
                  });
              }
              else if (napaka) {
                res.status(500).json(napaka);
              } else {
                if (req.query.userId) {
                  Uporabnik.findById(req.query.userId).exec((napaka, uporabnik) => {
                    if (!uporabnik) {
                      return res.status(404).json({
                        sporočilo:
                          "Ne najdem uporabnika s podanim enoličnim identifikatorjem idUporabnika. : dogodkiPreberiVse",
                      });
                    } else if (napaka) {
                      return res.status(500).json(napaka);
                    } else {
                      res.status(200).json({ user: uporabnik, events: dogodki, totalEvents: count[0].count });
                    }
                  });
                } else {
                  res.status(200).json({ events: dogodki, totalEvents: count[0].count });
                }
              }
            });
      });
  } else {
    Dogodek.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "razdalja",
          spherical: true,
          maxDistance: razdalja * 1000,
        },
      },
      { $addFields: { results: { $regexMatch: { input: "$title", regex: reg } } } },
      { $match: { results: true } },
      { $match: { "date": { "$gt": start } } },
      { $match: { "date": { "$lt": end } } },
      {
        $count: "count"
      }
    ])
      .exec((napaka, count) => {
        if (napaka) {
          res.status(500).json(napaka);
        }
        else
          Dogodek.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
                distanceField: "razdalja",
                spherical: true,
                maxDistance: razdalja * 1000,
              },
            },
            { $addFields: { results: { $regexMatch: { input: "$title", regex: reg } } } },
            { $match: { results: true } },
            { $match: { "date": { "$gt": start } } },
            { $match: { "date": { "$lt": end } } }
          ])
            .skip(offset)
            .limit(limit)
            .exec((napaka, dogodki) => {
              if (!dogodki) {
                return res
                  .status(404)
                  .json({
                    sporočilo:
                      "Ne najdem dogodkov."
                  });
              }
              else if (napaka) {
                res.status(500).json(napaka);
              } else {
                if (req.query.userId) {
                  Uporabnik.findById(req.query.userId).exec((napaka, uporabnik) => {
                    if (!uporabnik) {
                      return res.status(404).json({
                        sporočilo:
                          "Ne najdem uporabnika s podanim enoličnim identifikatorjem idUporabnika. : dogodkiPreberiVse",
                      });
                    } else if (napaka) {
                      return res.status(500).json(napaka);
                    } else {
                      res.status(200).json({ user: uporabnik, events: dogodki, totalEvents: count[0].count });
                    }
                  });
                } else {
                  res.status(200).json({ events: dogodki, totalEvents: count[0].count });
                }
              }
            });
      });
  }
};

module.exports = {
  dogodkiPreberiVse,
  dogodkiKreiraj,
  dogodkiPreberiIzbranega,
  dogodkiPosodobiIzbranega,
  dogodkiIzbrisiIzbranega,
  dogodkiPreberiUstvarjene,
  dogodkiPreberiPridruzene,
  dogodkiPridruziUporabnika,
  dogodkiOdstraniUporabnika,
  dogodkiSeznamPoRazdalji
};