// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./DonacijeVmesnik.sol";

contract DonacijeDogodek is DonacijeVmesnik {

    struct Uporabnik {
        bool jePrijavljen;
    }

    enum StatusDogodka {
        Aktiven,
        Koncan,
        Preklican
    }

    mapping(address => Uporabnik) public prijavljeni;
    mapping(address => uint256) public donacije;
    address public lastnik;
    StatusDogodka public statusDogodka;
    bool public jeKoncan;
    bool public jePreklican;
    bool public jePovraciloDovoljeno;

    event PrijavaUporabnikaDogodek(address uporabnik);
    event DonacijaDogodek(address indexed donator, uint256 vrednost);
    event KoncanDogodek();
    event PrekliciDogodek();
    event PovraciloDogodek(address donator, uint256 vrednost);

    constructor() {
        lastnik = msg.sender;

        jePreklican = false;
        jeKoncan = false;
        jePovraciloDovoljeno = false;
        statusDogodka = StatusDogodka.Aktiven;
    }

    modifier samoLastnik {
        require(msg.sender == lastnik,
        "klicatelj funkcije mora biti lastnik");
        _;
    }

    modifier aktivenDogodek {
        require(
            statusDogodka == StatusDogodka.Aktiven,
            "funkcijo lahko zahtevamo le ce je dogodek aktiven"
        );
        _;
    }

    modifier samoPrijavljen() {
        require(
            prijavljeni[msg.sender].jePrijavljen, 
            "uporabnik mora biti prijavljen na dogodek"
        );
        _;
    }

    function prijavaNaDogodek() aktivenDogodek public {
        require(
            !prijavljeni[msg.sender].jePrijavljen, 
            "uporabnik je ze prijavljen"
        );
        prijavljeni[msg.sender].jePrijavljen = true;
        emit PrijavaUporabnikaDogodek(msg.sender);
    }

    function doniranje() samoPrijavljen public payable {
        require(jeVeljavnaDonacija(msg.value));

        address donator = msg.sender;
        uint256 donacija = msg.value;

        donacije[donator] += donacija;
        emit DonacijaDogodek(donator, donacija);
    }

    function jeVeljavnaDonacija(uint256 _donacija) internal view returns (bool) {
        bool vecjaOdNic = _donacija != 0;
        bool dogodekNiKoncan = !jeKoncan;
        return vecjaOdNic && dogodekNiKoncan;
    }

    function prekiniDogodek() samoLastnik aktivenDogodek public {
        jePreklican = true;
        koncajDogodek();
    }

    function koncajDogodek() samoLastnik aktivenDogodek public {
        jeKoncan = true;
        if (jePreklican) {
            jePovraciloDovoljeno = true;
            statusDogodka = StatusDogodka.Preklican;
            emit PrekliciDogodek();
        } else {
            statusDogodka = StatusDogodka.Koncan;
            emit KoncanDogodek();
        }
    }

    function povracilo() public {
        if (!jePovraciloDovoljeno) revert("dogodek ni preklican");
        address donator = msg.sender;
        uint256 donacija = donacije[donator];
        if(donacija == 0) revert("znesek donacij je enak 0");
        donacije[donator] = 0;
        emit PovraciloDogodek(donator, donacija);
        if(!payable(donator).send(donacija)) revert();
    }

  function jePrijavljenUporabnik(address _naslov) public view returns(bool) {
    return prijavljeni[_naslov].jePrijavljen;
  }

  function jeLastnik(address _naslov) public view returns(bool) {
    return _naslov == lastnik;
  }

  function vrniStatusDogodka() public view returns(StatusDogodka) {
    return statusDogodka;
  }

  function imaUporabnikDonacije(address _naslov) public view returns(bool) {
    uint256 donacija = donacije[_naslov];
    if(donacija == 0) return false;
    return true;
  }

}