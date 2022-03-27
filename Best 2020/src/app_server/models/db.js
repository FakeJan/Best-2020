const mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/stockbotics';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_CLOUD_URI;
}

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose je povezan na ${dbURI}.`);
    const timer = require('../controllers/timer');
    timer();
});

mongoose.connection.on('error', napaka => {
    console.log('Mongose napaka pri povezavi: ', napaka);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose ni povezan.');
});

const pravilnaUstavitev = (sporocilo, povratniKlic) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose je zaprl povezavo preko '${sporocilo}'.`);
        povratniKlic();
    });
};

//Ponovni zagon nodemon
process.once('SIGUSR2', () => {
    pravilnaUstavitev('nodemon ponovni zagon', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//Izhod iz aplikacije
process.on('SIGINT', () => {
    pravilnaUstavitev('izhod iz aplikacije', () => {
        process.exit(0);
    });
});

//Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
    pravilnaUstavitev('izhod iz aplikacije na Heroku', () => {
        process.exit(0);
    });
});


require("./shema-boti");
require("./shema-napovedi");
//require("./shema-podjetja");
//require("./shema-skrbniki");
//require("./shema-super-uporabniki");
require("./shema-uporabniki");