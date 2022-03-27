var request = require('request');
const teachingLavbicAPIUrl = 'https://teaching.lavbic.net/api';
var drugaBaza = require("../models/db2");
const Podjetje = drugaBaza.model("Podjetje");

const pridobiPodjetja = (req, res) => {
    Podjetje.find({}, function (err, podjetja) {
        var podjetjaMap = [];
        podjetja.forEach(function (podjetje) {
            podjetjaMap.push(podjetje);
        });
        res.send(podjetjaMap);
    });
};

const apiKlicZaSeznamDelnic = () => {
    console.log('API klic za seznam delnic');
    request(teachingLavbicAPIUrl + '/finance/delnice/seznam', function (napaka, odgovor, body) {
        // ce bodo kdaj dvojni zapisi (da bo isto ime podjetja veckrat napisano), odkomentiraj delete in zakomentiraj spodnji del, da se baza resetira
        // (to naredi enkrat, spet vrni v prvotno stanje)

        // Podjetje.find({}).deleteMany({})
        //     .exec(napaka => {
        //         if (napaka)
        //             console.log(napaka);
        //     });

        // od tu komentiraj
        Podjetje.find({})
            .exec(napaka => {
                if (napaka) {
                    return;
                }
                const jsonTabela = JSON.parse(body);
                let odgovor = [];
                for (let key in jsonTabela) {
                    if (jsonTabela.hasOwnProperty(key)) {
                        const zapis = {
                            ime: jsonTabela[key].podjetje,
                            simbol: jsonTabela[key].simbol,
                            sektor: jsonTabela[key].sektor,
                            valuta: jsonTabela[key].valuta,
                            datumPosodobitveZgodovinskihPodatkov: null
                        };
                        odgovor.push(zapis);
                        Podjetje.findOneAndUpdate({"ime": zapis.ime})
                            .exec((napaka, podjetje) => {
                                if (!podjetje) {
                                    Podjetje.create(zapis);
                                } else {
                                    podjetje.simbol = zapis.simbol;
                                    podjetje.sektor = zapis.sektor;
                                    podjetje.valuta = zapis.valuta;
                                    podjetje.save();
                                }
                            });
                    }
                }
            })
        // do tu
    });
};


const pridobiZgodovinskePodatkePodjetja = (req, res) => {
    Podjetje.findOne({simbol: req.params.simbol})
        .exec((napaka, podjetje) => {
            if (napaka)
                res.status(500).json(napaka);
            if (!podjetje)
                res.status(404).json({odgovor: "ne najdem podjetja"});

            res.status(200).json(podjetje.seznamZgodovinskihPodatkov);
        });
};

const pridobiZgodovinskePodatkePodjetij = () => {
    Podjetje.find({})
        .exec((napaka, podjetja) => {
            for (let i in podjetja) {
                if (podjetja.hasOwnProperty(i)) {
                    podjetja[i].seznamZgodovinskihPodatkov = [];
                    apiKlicZaZgodovinskePodatke(podjetja[i],
                        new Date(2020, 0, 12).toISOString().split('T')[0],
                        new Date(2020, 0, 22).toISOString().split('T')[0]);
                }
            }
        });
};

const apiKlicZaZgodovinskePodatke = (podjetje, zacetek, konec, datum) => {
    const options = {
        url: teachingLavbicAPIUrl + '/finance/delnice/cene/' + podjetje.simbol,
        qs: {
            zacetek: zacetek,
            konec: konec
        }
    };
    request(options, function (napaka, odgovor, body) {
        console.log('API klic za pridobitev zgodovinskih podatkov delnice ' + podjetje.simbol);
        if (napaka) {
            return res.status(500).json(napaka);
        }
        if (odgovor.statusCode < 300) {
            var jsonTabela = JSON.parse(body);
            for (let key in jsonTabela) {
                if (jsonTabela.hasOwnProperty(key)) {
                    podjetje.seznamZgodovinskihPodatkov.push({
                        datum: jsonTabela[key].date,
                        open: parseFloat(jsonTabela[key].open),
                        high: parseFloat(jsonTabela[key].high),
                        low: parseFloat(jsonTabela[key].low),
                        close: parseFloat(jsonTabela[key].close),
                        volume: parseFloat(jsonTabela[key].volume),
                        adjusted: parseFloat(jsonTabela[key].adjusted)
                    });
                }
            }
            podjetje.datumPosodobitveZgodovinskihPodatkov = datum;
            podjetje.save();
        }
    });
};

module.exports = {
    pridobiZgodovinskePodatkePodjetja,
    apiKlicZaZgodovinskePodatke,
    apiKlicZaSeznamDelnic,
    pridobiPodjetja,
    pridobiZgodovinskePodatkePodjetij
};