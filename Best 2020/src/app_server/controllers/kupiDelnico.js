const drugaBaza = require("../models/db2");
const Podjetje = drugaBaza.model('Podjetje');

const izvedi = async (botObject, simbol_podjetja) => {
    console.log('bot ' + botObject.bot.ime + ' kupi delnico podjetja ' + simbol_podjetja);

    const podjetje = await Podjetje.findOne({simbol: simbol_podjetja}).exec();
    if (botObject.bot.parameterInvesticije >= podjetje.seznamZgodovinskihPodatkov[0].adjusted) {
        let razlika = botObject.bot.parameterInvesticije - podjetje.seznamZgodovinskihPodatkov[0].adjusted;
        botObject.bot.izgubljeniDenar += razlika;
        botObject.bot.parameterInvesticije -= razlika;
    }
    return new Promise((resolve => {
        resolve();
    }))

};

module.exports = izvedi;