/**
 * Funkcionalni testi
 */

(async function GoodMeets() {
  // Knjižnice
  const { execSync } = require("child_process");
  const { describe, it, after, before } = require("mocha");
  const { Builder, By } = require("selenium-webdriver");
  const chrome = require("selenium-webdriver/chrome");
  const expect = require("chai").expect;
  const driver = require('selenium-webdriver')

  // Parametri
  //let aplikacijaUrl = "http://localhost:4200/";
  let aplikacijaUrl = "https://goodmeets.herokuapp.com/";
  let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
  let brskalnik, jwtZeton;

  const axios = require("axios").create({
    baseURL: aplikacijaUrl + "api/",
    timeout: 5000,
  });

  // Obvladovanje napak
  process.on("unhandledRejection", (napaka) => {
    console.log(napaka);
  });

  const delay = ms => new Promise(res => setTimeout(res, ms));



  // Počakaj določeno število sekund na zahtevani element na strani
  let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
    await brskalnik.wait(
      () => {
        return brskalnik.findElements(By.xpath(xpath)).then((elementi) => {
          return elementi[0];
        });
      },
      casVS * 1000,
      `Stran se ni naložila v ${casVS} s.`
    );
  };



  try {
    before(() => {
      // axios.baseURL =  axios.baseURL + "db/podatki/vnos"
      // axios.get()
      //   .then(odgovor => {
      //     if (!odgovor || odgovor.status != 201) {
      //       // res.status(400).json("Napaka pri dostopu na API");
      //     } else {
      //       // res.status(201).json(odgovor.status);
      //       console.log("PODATKI VNEŠENI");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // axios.get("api/db/podatki/vnos")

      brskalnik = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(
          new chrome.Options()
            .addArguments("start-maximized")
            .addArguments("disable-infobars")
            .addArguments("allow-insecure-localhost")
            .addArguments("allow-running-insecure-content")
        )
        .usingServer(seleniumStreznikUrl)
        .build();
    });



    describe("Resetiranje podatkov", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl + "db");
      });

      it("Vnos začetnih podatkov", async () => {
        await pocakajStranNalozena(brskalnik, 20, "//button[contains(text(),'VNOS ZAČETNIH PODATKOV')]");

        let vnosButton = await brskalnik.findElement(By.xpath("//button[contains(text(),'VNOS ZAČETNIH PODATKOV')]"));
        await vnosButton.click();

        await pocakajStranNalozena(brskalnik, 20, "//p[@style='display: block;']");

        let feedback = await brskalnik.findElements(By.xpath("//p[@style='display: block;']"));

        expect(feedback).to.be.an("array").to.have.lengthOf(1);
        await (feedback[0].getText().then(function (vsebina) {
          expect(vsebina).to.be.equal("Podatki so bili uspešno vneseni!");
        }));

        // let odgovor = await axios({
        //   method: "get",
        //   url: "db/podatki/vnos"
        // });

        // expect(odgovor.status).to.be.equal(201);
      });

    });

    describe("Seznam dogodkov za gosta", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl + "dogodki_gost");
      });

      it("število dogodkov na začetni strani", async () => {
        await pocakajStranNalozena(brskalnik, 20, "//h5");
        let lokacije = await brskalnik.findElements(By.css("h5"));
        expect(lokacije).to.be.an("array").to.have.lengthOf(10);
      });

      context("Ustreznost podatkov na strani dogodkov za gosta", function () {
        it("Vsebina prvega dogodka", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));
          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Nogometna tekma");
          }
          ));

        });

        it("Vsebina prvega dogodka :  FILTRIRANJE", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let sortBy = await brskalnik.findElement(By.xpath("//select"));

          await sortBy.sendKeys("Datum naraščajoče");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));
          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Večerno igranje");
          }));

        });

        it("Vsebina prvega dogodka :  ISKANJE", async function () {
          before(() => {
            brskalnik.get(aplikacijaUrl + "dogodki_gost");
          });

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let search = await brskalnik.findElement(By.id("search"));

          await search.sendKeys("roj");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(1);

          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Rojstnodnevna zabava");
          }
          ));
        });

        it("Gumbi dogodka", async function () {
          before(() => {
            brskalnik.get(aplikacijaUrl + "dogodki_gost");
          });

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let dogodki = await brskalnik.findElements(By.css("h5"));
          expect(dogodki).to.not.be.empty;

          let buttonJoin = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Pridruži se')]"));
          expect(buttonJoin).to.be.empty;
          let buttonLeave = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Odjavi se')]"));
          expect(buttonLeave).to.be.empty;
          let buttonEdit = await brskalnik.findElements(By.xpath("//a[contains(text(), 'Uredi')]"));
          expect(buttonEdit).to.be.empty;
          let buttonDonate = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Doniraj')]"));
          expect(buttonDonate).to.be.empty;
          let buttonDelete = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Izbriši')]"));
          expect(buttonDelete).to.be.empty;
        });
      });

    });

    describe("Funkcionalnost registracije in prijave", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl);
      });

      it("Začetna stran aplikacije", async () => {
        await pocakajStranNalozena(brskalnik, 20, "//h2");
        let naslovi = await brskalnik.findElements(By.css("h2"));
        expect(naslovi).to.be.an("array").to.have.lengthOf(6);
      });




      context("Registracija uporabnika", function () {
        before(() => {
          brskalnik.get(aplikacijaUrl);
        });
        it("Preusmeritev na stran /signup", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h2");

          let registracijaPovezava = await brskalnik.findElement(By.xpath("//a[@href = '/signup']"));

          await registracijaPovezava.click();

          let stranNsdlob = await brskalnik.findElements(By.xpath("//div[contains(text(),'Registracija')]"));
          expect(stranNsdlob).to.not.be.empty;

        });
      });

      context("Prijava uporabnika", function () {
        before(() => {
          brskalnik.get(aplikacijaUrl);
        });

        it("Preusmeritev na stran /login", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h2");

          let prijavaPovezava = await brskalnik.findElement(By.xpath("//a[@href = '/login']"));

          await prijavaPovezava.click();

          let stranNsdlob = await brskalnik.findElements(By.xpath("//div[contains(text(),'Prijava')]"));
          expect(stranNsdlob).to.not.be.empty;

        });

        // it("Prijava : napačno geslo", async function () {
        //   await pocakajStranNalozena(brskalnik, 10, "//h5");

        //   let sortBy = await brskalnik.findElement(By.xpath("//select"));

        //   await sortBy.sendKeys("Datum padajoče");

        //   let dogodki = await brskalnik.findElements(By.xpath("//h5"));
        //   let dogodek = dogodki[0];
        //   expect(dogodek).to.not.be.null;

        //   let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

        //   await (naslovDogodka.getText().then(function (vsebina) {
        //     expect(vsebina).to.be.equal("Ogled filma Avengers v kinu");
        //   }));

        // });

        it("Prijava : pravilni podatki", async function () {

          let emailInput = await brskalnik.findElement(By.name("email"));

          await emailInput.sendKeys("imepriimek1@gmail.com");

          let passInput = await brskalnik.findElement(By.name("geslo"));

          await passInput.sendKeys("Aa1");

          let loginButton = await brskalnik.findElement(By.xpath("//button[@type='submit']"));

          await loginButton.click();

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let uporabnikData = brskalnik.findElement(By.id("uporabnikImePriiimek"));

          await (uporabnikData.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Ime1 Priimek1");
          }
          ));
        });

        it("pridobi JWT žeton", async function () {
          jwtZeton = await brskalnik.executeScript(function () {
            return localStorage.getItem("zeton");
          });
          expect(jwtZeton).to.not.be.empty;
        });

      });

    });

    describe("Pregled uporabnikovih dogodkov", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl + "pridruzeni_dogodki");
      });

      context("Pridruženi dogodki", function () {
        it("Število podatkov in pravilna vsebina", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h5");

          await delay(1000);

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Plezanje po skalah");
          }
          ));

        });

        it("Pravilnost gumbov dogodkov", async function () {
          before(() => {
            brskalnik.get(aplikacijaUrl + "pridruzeni_dogodki");
          });

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let buttonJoin = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Pridruži se')]"));
          expect(buttonJoin).to.be.empty;

          let buttonLeave = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Odjavi se')]"));
          expect(buttonLeave).to.be.an("array").to.have.lengthOf(3);

          let buttonEdit = await brskalnik.findElements(By.xpath("//a[contains(text(), 'Uredi')]"));
          expect(buttonEdit).to.be.empty;

          let buttonDonate = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Doniraj')]"));
          expect(buttonDonate).to.be.an("array").to.have.lengthOf(3);

          let buttonDelete = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Izbriši')]"));
          expect(buttonDelete).to.be.empty;

        });

        it("Odjava iz dogodka", async function () {
          before(() => {
            brskalnik.get(aplikacijaUrl + "pridruzeni_dogodki");
          });

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Plezanje po skalah");
          }
          ));

          let leaveButton = await dogodek.findElement(By.xpath("//button[contains(text(), 'Odjavi se')]"));

          await leaveButton.click();

          await delay(1000);

          dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(2);

          dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Ogled filma Avengers v kinu");
          }
          ));

        });
      });

      context("Ustvarjeni dogodki", function () {
        before(() => {
          brskalnik.get(aplikacijaUrl + "ustvarjeni_dogodki");
        });
        it("Število podatkov in pravilna vsebina", async function () {
          await pocakajStranNalozena(brskalnik, 10, "//h5");

          await delay(1000);

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Nogometna tekma");
          }
          ));

        });

        it("Pravilnost gumbov dogodkov", async function () {
          before(() => {
            brskalnik.get(aplikacijaUrl + "ustvarjeni_dogodki");
          });

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let buttonJoin = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Pridruži se')]"));
          expect(buttonJoin).to.be.empty;

          let buttonLeave = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Odjavi se')]"));
          expect(buttonLeave).to.be.empty;

          let buttonEdit = await brskalnik.findElements(By.xpath("//a[contains(text(), 'Uredi')]"));
          expect(buttonEdit).to.be.an("array").to.have.lengthOf(3);

          let buttonDonate = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Doniraj')]"));
          expect(buttonDonate).to.be.empty;

          let buttonDelete = await brskalnik.findElements(By.xpath("//button[contains(text(), 'Izbriši ')]"));
          expect(buttonDelete).to.be.an("array").to.have.lengthOf(3);

        });

        it("Uredi dogodek : Preusmeritev in pravilni podatki", async function () {
          before(() => {
            brskalnik.get(aplikacijaUrl + "ustvarjeni_dogodki");
          });

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Nogometna tekma");
          }
          ));

          let editButton = await dogodek.findElement(By.xpath("//a[contains(text(), 'Uredi')]"));

          await editButton.click();

          await pocakajStranNalozena(brskalnik, 10, "//h4");

          await delay(1000);

          let eventTitle = await brskalnik.findElement(By.xpath("//input[@id='title']"));
          let eventCity = await brskalnik.findElement(By.xpath("//input[@id='city']"));
          let eventAddress = await brskalnik.findElement(By.id("address"));
          let eventMaxParticipants = await brskalnik.findElement(By.id("participantsMax"));

          let tag1 = await brskalnik.findElement(By.xpath("//li[contains(text(), 'Šport')]"));
          let tag2 = await brskalnik.findElement(By.xpath("//li[contains(text(), 'Nogomet')]"));
          let tag3 = await brskalnik.findElement(By.xpath("//li[contains(text(), 'Zunaj')]"));

          await (eventTitle.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("Nogometna tekma");
          }
          ));

          await (eventCity.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("8000 Novo Mesto");
          }
          ));

          await (eventAddress.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("Črmošnjice pri Stopičah ");
          }
          ));

          await (eventMaxParticipants.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("11");
          }
          ));


          await (tag1.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Šport\n×");
          }
          ));

          await (tag2.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Nogomet\n×");
          }
          ));

          await (tag3.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Zunaj\n×");
          }
          ));

        });

        it("Izbris dogodka", async function () {
          await brskalnik.get(aplikacijaUrl + "ustvarjeni_dogodki");

          await pocakajStranNalozena(brskalnik, 10, "//h5[@class='card-title']");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          let naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Nogometna tekma");
          }
          ));

          let deleteButton = await dogodek.findElement(By.xpath("//button[contains(text(), 'Izbriši')]"));

          await deleteButton.click();

          await delay(1000);

          dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(2);

          dogodek = dogodki[0];
          expect(dogodek).to.not.be.null;

          naslovDogodka = await dogodek.findElement(By.xpath("//h5"));

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Večerno igranje");
          }
          ));

        });
      });

      context("Dodajanje in urejanje dogodka", function () {
        it("Dodajanje dogodka : Skladni podatki", async function () {
          await brskalnik.get(aplikacijaUrl + "ustvari_dogodek");
          await pocakajStranNalozena(brskalnik, 10, "//h4");

          let eventTitle = await brskalnik.findElement(By.xpath("//input[@id='title']"));
          await eventTitle.sendKeys("Testni dogodek");
          // let eventImageSelect = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Uredi')]"));
          // await eventImageSelect.click();
          // await delay(200);
          // let images = await brskalnik.findElements(By.xpath("//a"));
          // let image = images[27];
          // await image.click();

          let selectLocation = await brskalnik.findElement(By.xpath("//button[contains(text(), ' Izberi lokacijo ')]"));
          await selectLocation.click();
          let map = await brskalnik.findElement(By.id("map"));
          await delay(1000);
          await map.click();
          let saveLocation = await brskalnik.findElement(By.id("saveLocation"));
          await saveLocation.click();

          await delay(500);

          let datePicker = await brskalnik.findElement(By.xpath("//input[@id='date']"));
          await datePicker.sendKeys(driver.Key.CONTROL, "a", driver.Key.DELETE);
          await datePicker.sendKeys("Tue Mar 22 2022 12:45:33 GMT+0100 (Central European Standard Time)");

          let tagInput = await brskalnik.findElement(By.id("tagInput"));
          await tagInput.sendKeys("Piknik&Zabava");
          await tagInput.sendKeys(driver.Key.ENTER);
          await tagInput.sendKeys("Zunaj");
          await tagInput.sendKeys(driver.Key.ENTER);
          await tagInput.sendKeys("Zabava");
          await tagInput.sendKeys(driver.Key.ENTER);
          await tagInput.sendKeys("Piknik");
          await tagInput.sendKeys(driver.Key.ENTER);


          let addEventButton = await brskalnik.findElement(By.id("createEvent"));

          brskalnik.executeScript("arguments[0].scrollIntoView(true);", addEventButton);
          await delay(500);

          //scroll to element?

          await addEventButton.click();

          await delay(500);

          await brskalnik.switchTo().alert().accept();

          await delay(500);

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          await delay(1000);

          let povezava = await brskalnik.getCurrentUrl();

          expect(povezava).to.be.equal(aplikacijaUrl + "ustvarjeni_dogodki");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let naslovDogodka = dogodki[2];

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Testni dogodek");
          }
          ));

        });

        it("Urejanje dogodka : Skladni podatki", async function () {
          await brskalnik.get(aplikacijaUrl + "ustvarjeni_dogodki");
          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));
          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          let naslovDogodka = dogodki[2];

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Testni dogodek");
          }
          ));

          let editButtons = await brskalnik.findElements(By.xpath("//a[contains(text(), 'Uredi')]"));

          expect(editButtons).to.be.an("array").to.have.lengthOf(3);

          await editButtons[2].click();

          await pocakajStranNalozena(brskalnik, 10, "//h4");

          await delay(1000);

          let eventTitle = await brskalnik.findElement(By.xpath("//input[@id='title']"));
          await eventTitle.sendKeys(driver.Key.CONTROL, "a", driver.Key.DELETE);

          await eventTitle.sendKeys("Popravljen testni dogodek");
          // let eventImageSelect = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Uredi')]"));
          // await eventImageSelect.click();
          // await delay(200);
          // let images = await brskalnik.findElements(By.xpath("//a"));
          // let image = images[27];
          // await image.click();

          let datePicker = await brskalnik.findElement(By.xpath("//input[@id='date']"));
          await datePicker.sendKeys(driver.Key.CONTROL, "a", driver.Key.DELETE);
          await datePicker.sendKeys("Tue Jun 21 2022 12:45:33 GMT+0100 (Central European Standard Time)");

          let existingTags = await brskalnik.findElements(By.xpath("//span[@class='closebtn']"));
          expect(existingTags).to.be.an("array").to.have.lengthOf(4);

          for (let i = 0; i < 4; i++) {
            const element = existingTags[i];

            brskalnik.executeScript("arguments[0].scrollIntoView(true);", element);
            await delay(200);

            await element.click();
          }

          let tagInput = await brskalnik.findElement(By.id("tagInput"));
          await tagInput.sendKeys("Šport");
          await tagInput.sendKeys(driver.Key.ENTER);
          await tagInput.sendKeys("Zunaj");
          await tagInput.sendKeys(driver.Key.ENTER);
          await tagInput.sendKeys("Pivo");
          await tagInput.sendKeys(driver.Key.ENTER);

          let saveEventButton = await brskalnik.findElement(By.id("saveEvent"));

          brskalnik.executeScript("arguments[0].scrollIntoView(true);", saveEventButton);
          await delay(500);

          //scroll to element?

          await saveEventButton.click();

          await delay(500);

          await brskalnik.switchTo().alert().accept();

          await delay(500);

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          await delay(1000);

          let povezava = await brskalnik.getCurrentUrl();

          expect(povezava).to.be.equal(aplikacijaUrl + "ustvarjeni_dogodki");

          dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(3);

          naslovDogodka = dogodki[2];

          await (naslovDogodka.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Popravljen testni dogodek");
          }
          ));

        });
      });

    });

    describe("Klepet", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl + "klepet");
      });

      it("Št. klepetov in neizbran klepet", async () => {
        await pocakajStranNalozena(brskalnik, 10, "//h1");

        await delay(1000);

        let chats = await brskalnik.findElements(By.xpath("//div[@class='name']"));

        //5 FOR EARCH SIDE NAV - MOBILE + LG
        expect(chats).to.be.an("array").to.have.lengthOf(10);

        let naslovKlepeta = await brskalnik.findElement(By.xpath("//h1"));
        await (naslovKlepeta.getText().then(function (vsebina) {
          expect(vsebina).to.be.equal("Ni izbranega pogovora");
        }
        ));
      });

      context("Preusmeritev na klepet, dodajanje, brisanje sporočila", function () {
        it("Preusmeritev na izbran klepet", async function () {
          await brskalnik.get(aplikacijaUrl + "pridruzeni_dogodki");

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          await delay(1000);

          let dogodki = await brskalnik.findElements(By.xpath("//h5"));

          expect(dogodki).to.be.an("array").to.have.lengthOf(2);

          let linksToChat = await brskalnik.findElements(By.xpath("//a//i[contains(@class, 'bi-chat-left-dots')]"));
          expect(linksToChat).to.be.an("array").to.have.lengthOf(2);

          await linksToChat[0].click();

          await pocakajStranNalozena(brskalnik, 10, "//h1");

          await delay(1000);

          let chats = await brskalnik.findElements(By.xpath("//div[@class='name']"));

          //5 FOR EARCH SIDE NAV - MOBILE + LG
          expect(chats).to.be.an("array").to.have.lengthOf(10);

          let naslovKlepeta = await brskalnik.findElement(By.xpath("//h1"));
          await (naslovKlepeta.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Ogled filma Avengers v kinu");
          }
          ));

        });

        it("Dodajanje komentarja v izbranem klepetu", async function () {
          await brskalnik.get(aplikacijaUrl + "klepet/61a26a28936c2224f93127f6");

          await pocakajStranNalozena(brskalnik, 10, "//h1");

          await delay(1000);

          let chats = await brskalnik.findElements(By.xpath("//div[@class='name']"));

          //5 FOR EARCH SIDE NAV - MOBILE + LG
          expect(chats).to.be.an("array").to.have.lengthOf(10);

          let naslovKlepeta = await brskalnik.findElement(By.xpath("//h1"));
          await (naslovKlepeta.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Ogled filma Avengers v kinu");
          }
          ));

          let otherMessages = await brskalnik.findElements(By.xpath("//div[contains(@class,'my-message')]"));
          let myMessages = await brskalnik.findElements(By.xpath("//div[contains(@class,'other-message')]"));


          expect(otherMessages).to.be.an("array").to.have.lengthOf(7);
          expect(myMessages).to.be.an("array").to.have.lengthOf(2);

          await (otherMessages[6].getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("TRIPALOSKI");
          }
          ));

          let inputMessage = await brskalnik.findElement(By.id("chatMessage"));
          await inputMessage.sendKeys("Testno sporočilo", driver.Key.ENTER);

          await delay(1000);

          myMessages = await brskalnik.findElements(By.xpath("//div[contains(@class,'other-message')]"));
          expect(myMessages).to.be.an("array").to.have.lengthOf(3);


          await (myMessages[2].getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Testno sporočilo");
          }
          ));
        });

        it("Brisanje komentarja v izbranem klepetu", async function () {
          await brskalnik.get(aplikacijaUrl + "klepet/61a26a28936c2224f93127f6");

          await pocakajStranNalozena(brskalnik, 10, "//h1");

          await delay(1000);

          let chats = await brskalnik.findElements(By.xpath("//div[@class='name']"));

          //5 FOR EARCH SIDE NAV - MOBILE + LG
          expect(chats).to.be.an("array").to.have.lengthOf(10);

          let naslovKlepeta = await brskalnik.findElement(By.xpath("//h1"));
          await (naslovKlepeta.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Ogled filma Avengers v kinu");
          }
          ));

          let otherMessages = await brskalnik.findElements(By.xpath("//div[contains(@class,'my-message')]"));
          let myMessages = await brskalnik.findElements(By.xpath("//div[contains(@class,'other-message')]"));


          expect(otherMessages).to.be.an("array").to.have.lengthOf(7);
          expect(myMessages).to.be.an("array").to.have.lengthOf(3);

          await (otherMessages[6].getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("TRIPALOSKI");
          }
          ));

          let deleteMessageButtons = await brskalnik.findElements(By.xpath("//a//i"));
          expect(deleteMessageButtons).to.be.an("array").to.have.lengthOf(3);
          await deleteMessageButtons[2].click();

          await delay(1000);

          myMessages = await brskalnik.findElements(By.xpath("//div[contains(@class,'other-message')]"));
          expect(myMessages).to.be.an("array").to.have.lengthOf(2);


          await (myMessages[1].getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("Kaj pa čokolada?");
          }
          ));
        });
      });

    });

    describe("Uporabniške nastavitve", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl + "dogodki");
      });

      context("Pregled in urejevanje", function () {
        it("Preusmeritev na nastavitve", async function () {
          await brskalnik.get(aplikacijaUrl + "dogodki");

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let userDropDown = await brskalnik.findElement(By.id("dropdownMenuLink"));

          await userDropDown.click();

          let settingsLink = await brskalnik.findElement(By.xpath("//a[@routerLink='/account_settings']"));

          await settingsLink.click();

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let povezava = await brskalnik.getCurrentUrl();

          expect(povezava).to.be.equal(aplikacijaUrl + "account_settings");

          let ime = await brskalnik.findElement(By.name("ime"));

          await (ime.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("Ime1");
          }
          ));

          let priimek = await brskalnik.findElement(By.name("priimek"));

          await (priimek.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("Priimek1");
          }
          ));


        });

        it("Sprememba osebnih podatkov v nastavitvah : Skladni podatki", async function () {
          await brskalnik.get(aplikacijaUrl + "account_settings");

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let ime = await brskalnik.findElement(By.name("ime"));

          await (ime.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("Ime1");
          }
          ));

          let priimek = await brskalnik.findElement(By.name("priimek"));

          await (priimek.getAttribute("value").then(function (vsebina) {
            expect(vsebina).to.be.equal("Priimek1");
          }
          ));

          let urediGumb = await brskalnik.findElement(By.xpath("//button[contains(text(),'UREDI')]"));
          await urediGumb.click();

          await ime.sendKeys(driver.Key.CONTROL, "a", driver.Key.DELETE);
          await ime.sendKeys("PosodobljenoIme1");

          await priimek.sendKeys(driver.Key.CONTROL, "a", driver.Key.DELETE);
          await priimek.sendKeys("PosodobljenPriimek1");

          let shraniGumb = await brskalnik.findElement(By.xpath("//button[contains(text(),'SHRANI')]"));
          await shraniGumb.click();

          await delay(10000);

          await pocakajStranNalozena(brskalnik, 10, "//h5");

          let povezava = await brskalnik.getCurrentUrl();

          expect(povezava).to.be.equal(aplikacijaUrl + "dogodki");

          let userDropDown = await brskalnik.findElement(By.id("dropdownMenuLink"));

          await (userDropDown.getText().then(function (vsebina) {
            expect(vsebina).to.be.equal("PosodobljenoIme1 PosodobljenPriimek1");
          }
          ));

        });
      });

    });

    after(async () => {
      brskalnik.quit();
    });
  } catch (napaka) {
    console.log("Med testom je prišlo do napake!");
  }
})();