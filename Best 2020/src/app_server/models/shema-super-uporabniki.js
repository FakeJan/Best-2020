const mongoose = require('mongoose');

const superUporabnikiShema = new mongoose.Schema({
    uporabniskoIme: {type: String, required: true},
    geslo: {type: String, required: true}
});

mongoose.model('SuperUporabnik', superUporabnikiShema, 'SuperUporabniki');