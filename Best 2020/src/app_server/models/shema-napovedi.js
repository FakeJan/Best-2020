const mongoose = require('mongoose');

const napovediShema = new mongoose.Schema({
    simbol_podjetja: {type: String, required: true},
    high: {type: Number, required: true},
    low: {type: Number, required: true}
});

mongoose.model('Napoved', napovediShema, 'Napovedi');