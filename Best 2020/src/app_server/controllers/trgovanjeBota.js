const request = require('request');
const mongoose = require('mongoose');
const Bot = mongoose.model('TrgovalniBot');
const Napoved = mongoose.model('Napoved');
const Uporabnik = mongoose.model('Uporabnik');
const drugaBaza = require("../models/db2");
const Podjetje = drugaBaza.model('Podjetje');
const zadrziDelnico = require('../controllers/zadrziDelnico');
const kupiDelnico = require('../controllers/kupiDelnico');
const prodajDelnico = require('../controllers/prodajDelnico');

let napovediApiUrl = 'http://localhost:3000/api-napovedi';
if (process.env.NODE_ENV === 'production') {
    napovediApiUrl = 'https://tpo-14-stockbotics.herokuapp.com/api-napovedi';
}

const sproziTrgovanje = () => {
    console.log('sprozi trgovanje');
    Bot.find({})
        .exec((napaka, boti) => {
            if (napaka) {
                return;
            }
            for (let i in boti) {
                if (boti.hasOwnProperty(i)) {
                    if (boti[i].zagnan) {
                        odlociSe(boti[i]);
                    }
                }
            }
        });
};

const posodobiNapovedi = async () => {
    console.log('posodobi napovedi');
    let podjetja = await Podjetje.find({}).exec();
    await Napoved.deleteMany({}).exec();
    for (let i in podjetja) {
        if (podjetja.hasOwnProperty(i)) {
            apiKlicNapovedi(podjetja[i]);
        }
    }
    return new Promise((resolve => {
        resolve();
    }))
};

const odlociSe = async (bot) => {
    let botObject = {bot};
    for (let i in bot.seznamPodjetij) {
        if (bot.seznamPodjetij.hasOwnProperty(i)) {
            const napoved = await Napoved.findOne({simbol_podjetja: bot.seznamPodjetij[i]}).exec();
            const random = Math.floor(Math.random() * 3);
            if (random === 0)
                await kupiDelnico(botObject, bot.seznamPodjetij[i]);
            else if (random === 1)
                await prodajDelnico(botObject, bot.seznamPodjetij[i]);
            else
                await zadrziDelnico(botObject, bot.seznamPodjetij[i]);
        }
    }
    botObject.bot.save();
};

const aktivirajBota = (req, res) => {
    Bot.findByIdAndUpdate({_id: req.body.bot._id}, {zagnan: true, parameterInvesticije: req.body.parameterInvesticije}, (napaka, bot) => {
        if (napaka) {
            res.status(500).json(napaka);
        }
        res.status(200).json({odgovor: "Bot uspesno zagnan"});
    })
};

const ustaviBota = (req, res) => {
    Bot.findByIdAndUpdate({_id: req.body._id}, {zagnan: false}, (napaka, bot) => {
        if (napaka) {
            res.status(500).json(napaka);
        }
        Uporabnik.find({})
            .exec((napaka, uporabniki) => {
                if (napaka)
                    res.status(500).json(napaka);
                if (!uporabniki)
                    res.status(404).json({obvestilo: "ne najdem uporabnika"});
                for (let i in uporabniki) {
                    if (uporabniki.hasOwnProperty(i)) {
                        let uporabnik = uporabniki[i];
                        var inArray = uporabnik.seznamBotov.some(function (bot) {
                            return bot.equals(bot._id);
                        });
                        if (inArray) {
                            uporabnik.denar += bot.parameterInvesticije;
                        }
                        uporabnik.save();
                    }
                }
                bot.parameterInvesticije = 0;
                bot.save();
                res.status(201).json({obvestilo: "bot uspesno ustavjen"});
            });
    })
};

const apiKlicNapovedi = (podjetje) => {
    const options = {
        url: napovediApiUrl + '/napovedi',
        json: true,
        body: {
            podatki: podjetje.seznamZgodovinskihPodatkov
        },
        method: "POST",
    };
    request(options, function (napaka, odgovor, body) {
            const high = body.high;
            const low = body.low;
            Napoved.create({
                "simbol_podjetja": podjetje.simbol,
                "high": high,
                "low": low
            });
            return new Promise((resolve => {
                resolve();
            }))
        }
    );
};

module.exports = {
    odlociSe,
    aktivirajBota,
    ustaviBota,
    posodobiNapovedi,
    sproziTrgovanje
};