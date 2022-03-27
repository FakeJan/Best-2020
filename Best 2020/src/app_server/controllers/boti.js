var mongoose = require("mongoose");

var Bot = require('../models/shema-boti');

const vrniBote = (req, res) => {
    Bot.find({}, function(err, boti) {
        var botiMap = [];
        boti.forEach(function (bot) {
            botiMap.push(bot);
        });
        res.send(botiMap);
    })
};

module.exports = {
    vrniBote
};