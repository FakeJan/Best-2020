let Donacije = artifacts.require("DonacijeDogodek");

module.exports = (postavitev) => {
    postavitev.deploy(Donacije);
}