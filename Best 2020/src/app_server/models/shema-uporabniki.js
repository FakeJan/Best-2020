const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
//var TrgovalniBot = require('./shema-boti.js');

const uporabnikiShema = new mongoose.Schema({
    ocena: {type: Number, required: false},
    vloga: {type: Number, required: true}, // 0 - navadni uporabnik, 1 - super uporabnik, 2 - skrbnik
    denar: {type: Number, required: false},
    uporabniskoIme: {type: String, required: true},
    geslo: String,
    datumPrijave: Date,
    email: {type: String, required: true},
    ime: {type: String, required: true},
    priimek: {type: String, required: true},
    zgoscenaVrednost: String,
    nakljucnaVrednost: String,
    seznamBotov: [{ type:mongoose.Schema.Types.ObjectId, ref: 'TrgovalniBot'}]
});

uporabnikiShema.methods.nastaviGeslo = function(geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512').toString('hex');
};

uporabnikiShema.methods.preveriGeslo = function(geslo) {
    var zgoscenaVrednost = crypto.pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512').toString('hex');
    return this.zgoscenaVrednost == zgoscenaVrednost;
};

uporabnikiShema.methods.generirajJwt = function() {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);
    console.log("JWT GESLO: "+process.env.JWT_GESLO);
    //fix JWT_GESLO undefined

    return jwt.sign({
        _id: this._id,
        uporabniskoIme: this.uporabniskoIme,
        email: this.email,
        vloga: this.vloga,
        ime: this.ime,
        priimek: this.priimek,

        datumPoteka: parseInt(datumPoteka.getTime() / 1000, 10)
    }, "tpobad");
};


module.exports = mongoose.model('Uporabnik', uporabnikiShema, 'Uporabniki');