var mongoose = require("mongoose");

var Uporabnik = require('../models/shema-uporabniki');

var pridobiUporabnika = function(req,res){
    //vrnemo seznam vseh dogodkov
    var idUporab = req.params.idUporabnika;
    console.log("Pridobi Uporabnika uporabnik.js "+ idUporab);
    Uporabnik.findById(idUporab,function(err,uporabnik){
        if(err){
            console.log("Pridobi uporabnika Err " + uporabnik);
            console.log(err);
            res.status(500).json({"sporočilo":"Napaka z odgovorom: "+err});
        }else{
            console.log("Pridobi uporabnika else " + uporabnik);
            res.status(200).json(uporabnik);
        }
    });
};

var posodobiUporabnika = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        uporabniskoIme:req.body.uporabniskoIme,
        email:req.body.email
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};
/*
var posodobiDatumPrijave = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        datumPrijave:req.body.datum,
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};
*/

var kupiBota = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        denar:req.body.denar,
        seznamBotov:req.body.seznamBotov
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};

var posodobiSredstva = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        denar:req.body.denar
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};

var posodobiVlogo = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        vloga:req.body.vloga
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};

const vrniUporabnike = (req, res) => {
    Uporabnik.find({}, function(err, uporabniki) {
        var uporabnikiMap = [];
        uporabniki.forEach(function (uporabnik) {
            uporabnikiMap.push(uporabnik);
        });
        res.send(uporabnikiMap);
    })
};

const izbrisiUporabnika = (req, res) => {
    Uporabnik.findByIdAndDelete(req.params.idUporabnika)
        .exec((napaka) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            return res.status(204).json(null);
        });
};

var izbrisBotaKnjiznice = function(req,res){
    var id = req.params.idUporabnika;
    var posodobljenUporabnik = {
        seznamBotov: req.body.seznamBotov
    };
    Uporabnik.findByIdAndUpdate(id,posodobljenUporabnik,function(err,el){
        if(err){
            res.status(400).json({'sporočilo':'Napaka z odgovorom: '+err});
        }else{
            res.status(200).json(el);
        }
    });
};

const preveriGesloUporabnika = (req, res) => {

    var id = req.params.idUporabnika;
    var geslo = req.body.geslo;

    if (!id || !geslo) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }

    Uporabnik.findById(id,function(err,uporabnik){
        if(err){
            console.log("Pridobi uporabnika za preverjanje gesla " + uporabnik);
            console.log(err);
            res.status(500).json({"sporočilo":"Napaka z odgovorom: "+err});
        }else{
            if (uporabnik.preveriGeslo(geslo)) {
                return res.status(200).json({"gesloOk": true});
            }
            else {
                return res.status(401).json({"gesloOk": false});
            }
        }
    });
};

const spremeniGesloUporabnika = (req, res) => {

    var id = req.params.idUporabnika;
    var geslo = req.body.geslo;

    if (!id || !geslo) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    var uporabnikNovoGeslo = new Uporabnik();
    uporabnikNovoGeslo._id = id;
    uporabnikNovoGeslo.nastaviGeslo(geslo);

    Uporabnik.findByIdAndUpdate(id, uporabnikNovoGeslo,function(err,uporabnik){
        if(err){
            console.log("Posodobi geslo uporabnika " + uporabnik);
            console.log(err);
            res.status(500).json({"sporočilo":"Napaka z odgovorom: "+err});
        }else{
            return res.status(200).json({"gesloSpremenjeno": true});
        }
    });
};


module.exports = {
    vrniUporabnike,
    pridobiUporabnika,
    posodobiUporabnika,
    izbrisiUporabnika,
    kupiBota,
    posodobiSredstva,
    izbrisBotaKnjiznice,
    posodobiVlogo,
    preveriGesloUporabnika,
    spremeniGesloUporabnika
    //posodobiDatumPrijave
};