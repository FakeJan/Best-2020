const drugaBaza = require("../models/db2");
const Podjetje = drugaBaza.model('Podjetje');

const izvedi = async (botObject, simbol_podjetja) => {
    console.log('bot ' + botObject.bot.ime + ' proda delnico podjetja ' + simbol_podjetja);

    const podjetje = await Podjetje.findOne({simbol: simbol_podjetja});
    botObject.bot.pridobljeniDenar += podjetje.seznamZgodovinskihPodatkov[0].adjusted;
    botObject.bot.parameterInvesticije += podjetje.seznamZgodovinskihPodatkov[0].adjusted;
    return new Promise((resolve => {
        resolve();
    }))
};

module.exports = izvedi;
