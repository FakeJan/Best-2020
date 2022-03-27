const mongoose = require('mongoose');

const trgovalniBotiShema = new mongoose.Schema({
    ime: {type: String, required: true},
    opis: {type: String, required: true},
    kreator: {type: String, required: true},
    cena: {type: Number, required: true},
    parameterStevilaDelnic: {type: Number, required: true},
    parameterInvesticije: {type: Number, required: true},
    parameterNakupa: {type: Number, required: true},
    parameterProdaje: {type: Number, required: true},
    zagnan: {type: Boolean, required: true},
    dobickonosnost: {type: Number, required: true},
    pridobljeniDenar: {type: Number, required: true},
    izgubljeniDenar: {type: Number, required: true},
    naprodaj: {type: Boolean, required: true},
    seznamPodjetij: [{type: String}]
});

// mongoose.model('TrgovalniBot', trgovalniBotiShema, 'TrgovalniBoti');
module.exports = mongoose.model('TrgovalniBot', trgovalniBotiShema, 'TrgovalniBoti');