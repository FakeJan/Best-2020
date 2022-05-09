const Donacije = artifacts.require("./DonacijeDogodek.sol");

contract("Donacije", () => {
    contract(
        "Donacije.KonecDogodka - funkcijski modifikator samoLastnik",
        (racuni) => {
            it("Uporabnik, ki ni lastnik, ne more koncati dogodka.", async () => {
                let donacije = await Donacije.deployed();
                let lastnik = await donacije.lastnik();
                let niLastnik = racuni[1];
                try {
                    await donacije.koncajDogodek({ from: niLastnik });
                    assert.isTrue(false);
                } catch (napaka) {
                    assert.isTrue(lastnik != niLastnik);
                    assert.equal(napaka.reason, "klicatelj funkcije mora biti lastnik");
                }
            });
        }
    );

    contract(
        "Donacije.KonecDogodka - uspešno",
        () => {
          it("Lastnik lahko konca dogodek ce je ta aktiven.", async () => {
            let donacije = await Donacije.deployed();
            let lastnik = await donacije.lastnik();
            await donacije.koncajDogodek({ from: lastnik });
            let status = await donacije.vrniStatusDogodka();
            let pricakovanStatus = 1;
            assert.equal(
                status.valueOf(),
                pricakovanStatus,
                "Trenutni status dogodka ni koncan"
            )
          });
        }
    );

    contract(
        "Donacije.PreklicDogodka - funkcijski modifikator aktivenDogodek",
        () => {
          it("Lastnik lahko preklice dogodek le ce je ta aktiven.", async () => {
            let donacije = await Donacije.deployed();
            let lastnik = await donacije.lastnik();
            await donacije.prekiniDogodek({ from: lastnik });
            try {
              await donacije.prekiniDogodek({ from: lastnik });
              assert.isTrue(false);
            } catch (napaka) {
              assert.equal(
                napaka.reason,
                "funkcijo lahko zahtevamo le ce je dogodek aktiven"
              );
            }
          });
        }
    );

    contract(
        "Donacije.PreklicDogodka - uspešno",
        () => {
          it("Lastnik lahko preklice dogodek ce je ta aktiven.", async () => {
            let donacije = await Donacije.deployed();
            let lastnik = await donacije.lastnik();
            await donacije.prekiniDogodek({ from: lastnik });
            let status = await donacije.vrniStatusDogodka();
            let pricakovanStatus = 2;
            assert.equal(
                status.valueOf(),
                pricakovanStatus,
                "Trenutni status dogodka ni preklican"
            )
          });
        }
    );

    contract(
        "Donacije.PrijavaNaDogodek - uporabnik je že prijavljen",
        (racuni) => {
          it("Uporabnik se na dogodek ne more prijaviti ce je ze prijavljen.", async () => {
            let donacije = await Donacije.deployed();
            let uporabnik = racuni[1];
            await donacije.prijavaNaDogodek({ from: uporabnik });
            try {
              await donacije.prijavaNaDogodek({ from: uporabnik });
              assert.isTrue(false);
            } catch (napaka) {
              assert.equal(
                napaka.reason,
                "uporabnik je ze prijavljen"
              );
            }
          });
        }
    );

    contract(
        "Donacije.PrijavaNaDogodek - uspešno",
        (racuni) => {
          it("Uporabnik se na dogodek lahko prijavi ce se ni prijavljen.", async () => {
            let donacije = await Donacije.deployed();
            let uporabnik = racuni[1];
            await donacije.prijavaNaDogodek({ from: uporabnik });
            let jePrijavljen = await donacije.jePrijavljenUporabnik(racuni[1]);
            assert.equal(
                jePrijavljen,
                true,
                "uporabnik je ze prijavljen"
            )
          });
        }
    );

    contract(
        "Donacije.Donacija - funkcijski modifikator samoPrijavljen",
        (racuni) => {
          it("Uporabnik lahko donira, le če je prijavljen na dogodek.", async () => {
            let donacije = await Donacije.deployed();
            let uporabnik = racuni[1];
            try {
                await donacije.doniranje({
                    value: 1000000000000000000,
                    from: uporabnik
                });
                assert.isTrue(false);
            }
            catch (napaka) {
                assert.equal(napaka.reason, "uporabnik mora biti prijavljen na dogodek");
            }        
          });
        }
    );

    contract(
        "Donacije.Donacija - uspešno",
        (racuni) => {
          it("Uporabnik lahko donira, če je prijavljen na dogodek.", async () => {
            let donacije = await Donacije.deployed();
            let uporabnik = racuni[1];
            await donacije.prijavaNaDogodek({ from: uporabnik });
            let jePrijavljen = await donacije.jePrijavljenUporabnik(racuni[1]);
            assert.equal(
                jePrijavljen,
                true,
                "uporabnik je ze prijavljen"
            );
            try {
                await donacije.doniranje({
                    value: 1000000000000000000,
                    from: uporabnik
                });
                assert.isTrue(true);
            }
            catch (napaka) {
                assert.equal(napaka.reason, "uporabnik ni prijavljen");
            }        
          });
        }
    );

    contract(
        "Donacije.Povracilo - dogodek je koncan",
        (racuni) => {
          it("Uporabnik ne more povrniti sredstev ce je dogodek koncan.", async () => {
            let donacije = await Donacije.deployed();
            let lastnik = await donacije.lastnik();
            let uporabnik = racuni[1];
            await donacije.prijavaNaDogodek({ from: uporabnik });
            let jePrijavljen = await donacije.jePrijavljenUporabnik(racuni[1]);
            assert.equal(
                jePrijavljen,
                true,
                "uporabnik je ze prijavljen"
            );

            await donacije.doniranje({
                value: 1000000000000000000,
                from: uporabnik
            });
            assert.isTrue(true);

            await donacije.koncajDogodek({ from: lastnik });
            let status = await donacije.vrniStatusDogodka();
            let pricakovanStatus = 1;
            assert.equal(
                status.valueOf(),
                pricakovanStatus,
                "Trenutni status dogodka ni koncan"
            )

            try {
                await donacije.povracilo({ from: uporabnik });
                assert.isTrue(true);
            }
            catch (napaka) {
                assert.equal(napaka.reason, "dogodek ni preklican");
            }        
          });
        }
    );

    contract(
        "Donacije.Povracilo - uspešno",
        (racuni) => {
          it("Uporabnik lahko povrne sredstva, če je dogodek preklican.", async () => {
            let donacije = await Donacije.deployed();
            let lastnik = await donacije.lastnik();
            let uporabnik = racuni[1];
            await donacije.prijavaNaDogodek({ from: uporabnik });
            let jePrijavljen = await donacije.jePrijavljenUporabnik(racuni[1]);
            assert.equal(
                jePrijavljen,
                true,
                "uporabnik je ze prijavljen"
            );

            await donacije.doniranje({
                value: 1000000000000000000,
                from: uporabnik
            });
            assert.isTrue(true);

            await donacije.prekiniDogodek({ from: lastnik });
            let status = await donacije.vrniStatusDogodka();
            let pricakovanStatus = 2;
            assert.equal(
                status.valueOf(),
                pricakovanStatus,
                "Trenutni status dogodka ni preklican"
            )

            try {
                await donacije.povracilo({ from: uporabnik });
                assert.isTrue(true);
            }
            catch (napaka) {
                assert.equal(napaka.reason, "dogodek ni preklican");
            }        
          });
        }
    );
    
});