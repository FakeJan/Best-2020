const mongoose = require('mongoose');
const fs = require('fs');
const Napoved = mongoose.model("Napoved");

const vrniNapovedi = (req, res) => {
    Napoved.find({}, function(err, napovedi) {
        var napovediMap = [];
         napovedi.forEach(function (napoved) {
             napovediMap.push(napoved);
         });

         res.send(napovediMap);
    })
};


module.exports = {
    vrniNapovedi
};