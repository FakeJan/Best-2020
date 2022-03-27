const mongoose = require('mongoose');

const skrbnikiShema = new mongoose.Schema({
    uporabniskoIme: {type: String, required: true},
    geslo: {type: String, required: true},
    email: {type: String, required: true},
    ime: {type: String, required: true},
    priimek: {type: String, required: true}
});

mongoose.model('Skrbnik', skrbnikiShema, 'Skrbniki');