const mongoose = require("mongoose");
const Uporabnik = mongoose.model("Uporabnik");
const Dogodek = mongoose.model("Dogodek");
const Chat = mongoose.model("Chat");
// var jsonUporabniki = require('/usr/src/app/app_api/models/testniPodatkiUporabnik_db.json');
// var jsonDogodki = require('/usr/src/app/app_api/models/testni-podatki-dogodki.json');
// var jsonChat = require('/usr/src/app/app_api/models/test-podatkiChatImport.json');

var jsonUporabniki;
var jsonDogodki;
var jsonChat;

console.log(__dirname);
if (process.env.NODE_ENV === "production") {
    jsonUporabniki = require('../models/uporabniki.json');
    jsonDogodki = require('../models//dogodki.json');
    jsonChat = require('../models//chat.json');
} else if (process.env.NODE_ENV === "docker") {
    jsonUporabniki = require('/usr/src/app/app_api/models/uporabniki.json');
    jsonDogodki = require('/usr/src/app/app_api/models/dogodki.json');
    jsonChat = require('/usr/src/app/app_api/models/chat.json');
}


const dbVnos = (req, res) => {

    odstraniPodatke(); //PREDEN vnese, vedno pobrise zaradi duplikatnih IDjev

    //parsanje podatkov iz extended json v json
    jsonUporabniki.forEach(element => {
        element._id = mongoose.Types.ObjectId(element._id);
        element.joined.forEach(x => {
            x._id =  mongoose.Types.ObjectId(x._id);
        });
        element.created.forEach(x => {
            x._id =  mongoose.Types.ObjectId(x._id);
        });
    });

    jsonDogodki.forEach(event => {
        for (let i = 0; i < event.users.length; i++) {
            event.users[i] = mongoose.Types.ObjectId(event.users[i]);
        }
    });

    jsonChat.forEach(element => {
        element.dogodekId = mongoose.Types.ObjectId(element.dogodekId);
        for (let index = 0; index < element.sporocila.length; index++) {
            element.sporocila[index].userId = mongoose.Types.ObjectId(element.sporocila[index].userId);
        }
    });

    Uporabnik.insertMany(jsonUporabniki, function (err, result) {
        if (err) {
            res.status(400).json(err);
            res.end();
        }
    });

    Dogodek.insertMany(jsonDogodki, (err, result) => {
        if (err) {
            res.status(400).json(err);
            res.end();
        }
    });

    Chat.insertMany(jsonChat, (err, result) => {
        if (err) {
            res.status(400).json(err);
            res.end();
        }
    });

    res.status(201).json();
};

const dbOdstranitev = (req, res) => {
    odstraniPodatke();
    res.status(204).json();
};
const odstraniPodatke = (req, res) => {
    Uporabnik.deleteMany({}, function (err) {
        if (err) {
            res.status(400).json(err);
            res.end();
        }
    });
    Dogodek.deleteMany({}, function (err) {
        if (err) {
            res.status(400).json(err);
            res.end();
        }
    });
    Chat.deleteMany({}, function (err) {
        if (err) {
            res.status(400).json(err);
            res.end();
        }
    });
};

module.exports = {
    dbVnos,
    dbOdstranitev,
};
