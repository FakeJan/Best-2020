const trgovanjeBota = require('./trgovanjeBota');
const DomacaStran = require('../controllers/domaca-stran');

// todo: odkomentiraj in izbrisi ko koncamo z razvijanjem
// const intervalTrgovanjaBotov = 5 * 60 * 1000; // 5 minut
const intervalTrgovanjaBotov = 60 * 1000; // 1 min

const intervalPosodobiPodjetjaInNapovedi = 24 * 60 * 60 * 1000; // 1 dan

const preveriCas = () => {
    // todo: ob prvem zagonu odkomentiraj te 3 metode, da se baza pravilno postavi, naslednji zagon
    // todo: nato ugasni server, zakomentiraj te vrstice nazaj, da ne obremnjujemo API-ja
    // DomacaStran.apiKlicZaSeznamDelnic();
    // setTimeout(() => {
    //     DomacaStran.pridobiZgodovinskePodatkePodjetij();
    //     setTimeout(() => {
    //         trgovanjeBota.posodobiNapovedi()
    //     }, 5000)
    // }, 1000);

    setInterval(trgovanjeBota.sproziTrgovanje, intervalTrgovanjaBotov);
    setInterval(DomacaStran.apiKlicZaSeznamDelnic, intervalPosodobiPodjetjaInNapovedi);
    setInterval(DomacaStran.pridobiZgodovinskePodatkePodjetij, intervalPosodobiPodjetjaInNapovedi + 10);
    setInterval(trgovanjeBota.posodobiNapovedi, intervalPosodobiPodjetjaInNapovedi + 20);
};

module.exports = preveriCas;