const mongoose = require('mongoose');
const drugaBaza = require('./db2');

const zgodovinskiPodatkiShema = new mongoose.Schema({
    datum: {type:String, required: true},
    open: {type:Number, default: 0},
    high: {type:Number, default: 0},
    low: {type:Number, default: 0},
    close: {type:Number, default: 0},
    volume: {type:Number, default: 0},
    adjusted: {type:Number, default: 0}
});

const podjetjaShema = new mongoose.Schema({
    ime: {type: String, required: true},
    simbol: {type: String, required: true},
    sektor: {type: String, required: true},
    valuta: {type: String, required: true},
    datumPosodobitveZgodovinskihPodatkov: {type: Date},
    seznamZgodovinskihPodatkov: [zgodovinskiPodatkiShema]
});

drugaBaza.model('Podjetje', podjetjaShema, 'Podjetja');
module.exports = drugaBaza.model('Podjetje', podjetjaShema);