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

const events = (req, res) => {
    axios.get("api/dogodki", {
        params: {
            userId: req.query.q
        }
    }).then((odgovor) => {
        prikaziDogodke(req, res, odgovor.data);
    })
        .catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
};

const prikaziDogodke = (req, res, data) => {
    res.render("events", {
        title: "Dogodki",
        events: data.events,
        user: data.user,
        layout: "eventsLayout"
    });
};

const eventsFilter = (req, res) => {
    axios
        .get("api/dogodkiFilter", {
            params: {
                userId: req.query.q,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                chategory: req.query.chategory,
                lng: req.query.lng,
                lat: req.query.lat,
                razdalja: req.query.razdalja
            }
        })
        .then((odgovor) => {
            prikaziDogodke(req, res, odgovor.data);
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
};

const createdEvents = (req, res) => {
    axios
        .get(
            "api/dogodki/ustvarjeni/" + req.params.id)
        .then((odgovor) => {
            res.render("created_events", {
                title: "Ustvarjeni dogodki",
                events: odgovor.data,
                createdEvents: true,
            });
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
};

const joinedEvents = (req, res) => {
    axios
        .get(
            "api/dogodki/pridruzeni/" + req.params.id)
        .then((odgovor) => {
            res.render("joined_events", {
                title: "Pridruženi dogodki",
                events: odgovor.data,
                joinedEvents: true,
            });
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
};

const joinEvent = (req, res) => {
    axios
        .post("api/dogodek/pridruzi", {
            userId: req.body.userId,
            eventId: req.body.eventId,
        })
        .then((odgovor) => {
            res.status(200).json(odgovor.data);
        })
        .catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
};

const leaveEvent = (req, res) => {
    axios
        .delete("api/dogodek/pridruzi", {
            data: {
                userId: req.body.userId,
                eventId: req.body.eventId,
            },
        })
        .then((odgovor) => {
            res.status(200).json(null);
        })
        .catch((error) => {
            res.status(error.response.status).json(error.response.data);
        });
};

const addEvent = (req, res) => {
    if (!req.body.title || !req.body.eventImage || !req.body.city
        || !req.body.address || !req.body.coordinates || !req.body.date
        || !req.body.tags) {
        res.status(400).json({ sporočilo: "Neveljavni podatki" });
    } else if (req.body.description && req.body.description.length > 800) {
        res.status(400).json({ sporočilo: "Neveljavni podatki" });
    } else {
        axios.post("api/dogodki", req.body).then((odgovor) => {
            res.status(201).json(odgovor.data);
        }).catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
    }
};

const getEvent = (req, res) => {
    axios.get("api/dogodki/" + req.params.id).then((odgovor) => {
        res.render("edit_event", {
            title: "Uredi dogodek",
            event: odgovor.data,
        });
    }).catch(error => {
        res.status(error.response.status).json(error.response.data);
    });
};

const updateEvent = (req, res) => {
    if (!req.body.title || !req.body.eventImage || !req.body.city
        || !req.body.address || !req.body.coordinates || !req.body.date
        || !req.body.tags) {
        res.status(400).json({ sporočilo: "Neveljavni podatki" });
    } else if (req.body.description && req.body.description.length > 800) {
        res.status(400).json({ sporočilo: "Neveljavni podatki" });
    } else {
        axios.put("api/dogodki/" + req.params.id, req.body).then((odgovor) => {
            res.status(200).json(odgovor.data);
        }).catch(error => {
            res.status(error.response.status).json(error.response.data);
        });
    }
};

const deleteEvent = (req, res) => {
    axios.delete("api/dogodki/" + req.params.id).then((odgovor) => {
        res.status(204).json(null);
    }).catch(error => {
        res.status(error.response.status).json(error.response.data);
    });
};

const createEvent = (req, res) => {
    res.render("create_event", {
        title: "Ustvari dogodek",
        createEvent: true
    });
};

module.exports = {
    events,
    createEvent,
    createdEvents,
    joinedEvents,
    joinEvent,
    leaveEvent,
    addEvent,
    getEvent,
    updateEvent,
    deleteEvent,
    eventsFilter
};
