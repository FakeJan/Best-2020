const izvedi = (botObject, simbol_podjetja) => {
    console.log('bot ' + botObject.bot.ime + ' zadrzi delnico podjetja ' + simbol_podjetja);
    // ne naredi nicesar
    return new Promise(((resolve) => {
        resolve();
    }));
};

module.exports = izvedi;