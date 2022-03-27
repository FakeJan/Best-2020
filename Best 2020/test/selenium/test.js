var assert = require('assert');
const { exec } = require("child_process");
const { Builder, By, Key, until } = require("E:\\Dominik\\TPO\\projekt\\LP4-14\\src\\stockbotics\\node_modules\\selenium-webdriver\\index.js");
const chrome = require("E:\\Dominik\\TPO\\projekt\\LP4-14\\src\\stockbotics\\node_modules\\selenium-webdriver\\chrome.js");
const expect = require("E:\\Dominik\\TPO\\projekt\\LP4-14\\src\\node_modules\\chai\\index.js").expect;
const driver = require("E:\\Dominik\\TPO\\projekt\\LP4-14\\src\\stockbotics\\node_modules\\selenium-webdriver\\index.js");

/**
 * URL naslovi
 */
let aplikacijaUrl = "http://localhost:8080/"; //HEROKU
let seleniumStreznikUrl = "http://localhost:4445/wd/hub";


/**
 * Obvladovanje napak
 */
process.on("unhandledRejection", (napaka) => {
    console.log(napaka);
});


/**
 * Funkcionalni testi
 */
(async function Stockbotics() { //morda z veliko
    let brskalnik, jwtZeton;
    let action;

    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(function() {
            return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
                return elementi[0];
            });
        }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    }

    try {
        brskalnik = new Builder()
            .forBrowser("chrome")
            .setChromeOptions(new chrome.Options()
                .addArguments("start-maximized")
                .addArguments("disable-infobars")
                .addArguments("allow-insecure-localhost")
                .addArguments("allow-running-insecure-content")
            )
            .usingServer(seleniumStreznikUrl)
            .build();

        //registracija
        //osnovni tok
        describe("Registracija uporabnika", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            it("pojdi na prijavo", async function() {
                await pocakajStranNalozena(brskalnik, 5,
                    "//a[contains(text(), 'Prijava')]");
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Prijava')]"));
                await expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            it("pojdi na registracijo", async function() {
                await pocakajStranNalozena(brskalnik, 5,
                    "//button[contains(text(), 'Nimate računa? Registrirajte se!')]");
                let povezava = await brskalnik.findElement(
                    By.xpath("//button[contains(text(), 'Nimate računa? Registrirajte se!')]"));
                await expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            context("Reg", async function() {
                it("Registriraj se", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Registracija')]");

                    let ime = await brskalnik.findElement(By.css("input[name='ime']"));
                    await expect(ime).to.not.be.empty;
                    ime.sendKeys("Janez");

                    let priimek = await brskalnik.findElement(By.css("input[name='priimek']"));
                    await expect(priimek).to.not.be.empty;
                    priimek.sendKeys("Novak");

                    let uporabnisko_ime = await brskalnik.findElement(By.css("input[name='username']"));
                    await expect(uporabnisko_ime).to.not.be.empty;
                    uporabnisko_ime.sendKeys("Jazo");

                    let email = await brskalnik.findElement(
                        By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("janez.novak@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("geslo1234");

                    let gesloPotrdi = await brskalnik.findElement(By.css("input[name='ponovigeslo']"));
                    await expect(gesloPotrdi).to.not.be.empty;
                    gesloPotrdi.sendKeys("geslo1234");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Registracija')]")).click();
                });

                it("preveri ali je uporabnik registriran", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let uporabnik = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(uporabnik).to.not.be.empty;
                });

                it("odjavi upoarabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    let povezava1 = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Odjava')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();
                });


            });
        });
        //izjemni tok
        describe("Registracija uporabnika izjemni", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            it("pojdi na prijavo izjemni", async function() {
                await pocakajStranNalozena(brskalnik, 5,
                    "//a[contains(text(), 'Prijava')]");
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Prijava')]"));
                await expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            it("pojdi na registracijo izjemni", async function() {
                await pocakajStranNalozena(brskalnik, 5,
                    "//button[contains(text(), 'Nimate računa? Registrirajte se!')]");
                let povezava = await brskalnik.findElement(
                    By.xpath("//button[contains(text(), 'Nimate računa? Registrirajte se!')]"));
                await expect(povezava).to.not.be.empty;
                await povezava.click();
            });
            context("Reg", async function() {
                it("Registriraj se napacno ime", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Registracija')]");

                    let ime = await brskalnik.findElement(By.css("input[name='ime']"));
                    await expect(ime).to.not.be.empty;
                    ime.sendKeys("Janecd1256");

                    let priimek = await brskalnik.findElement(By.css("input[name='priimek']"));
                    await expect(priimek).to.not.be.empty;
                    priimek.sendKeys("Novak123");

                    let uporabnisko_ime = await brskalnik.findElement(By.css("input[name='username']"));
                    await expect(uporabnisko_ime).to.not.be.empty;
                    uporabnisko_ime.sendKeys("Jazo12");

                    let email = await brskalnik.findElement(
                        By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("lojze.horvat@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("geslo1234");

                    let gesloPotrdi = await brskalnik.findElement(By.css("input[name='ponovigeslo']"));
                    await expect(gesloPotrdi).to.not.be.empty;
                    gesloPotrdi.sendKeys("geslo12345");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Registracija')]")).click();
                });

                it("preveri ali registracija ni uspela", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//a[contains(text(), 'Prijava')]");
                    let uporabnik = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Prijava')]"));
                    await expect(uporabnik).to.not.be.empty;
                });
            });
        });


        //prijava
        //osnovni tok
        describe("Prijava uporabnika", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Prijava uporabnika", async function() {
                it("prijava", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//a[contains(text(), 'Prijava')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Prijava')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });
            });
            context("Prijava", async function() {
                it("Prijavi se", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Prijava')]");
                    let email = await brskalnik.findElement(By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("janez.novak@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("geslo1234");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]")).click();
                });

                it("preveri ali je uporabnik prijavljen", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let uporabnik = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(uporabnik).to.not.be.empty;
                });

                it("odjavi upoarabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    let povezava1 = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Odjava')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();
                });
            });
        });
        //izjemni tok
        describe("Prijava uporabnika 2", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Prijava uporabnika izjemni tok", async function() {
                it("prijava izjemni tok", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//a[contains(text(), 'Prijava')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Prijava')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });
            });
            context("Prijava izjemni tok", async function() {
                it("Prijavi se izjemni tok", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Prijava')]");
                    let email = await brskalnik.findElement(By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("aljaz.smaljcelj@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("12345678910");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]")).click();
                });

                it("preveri ali je prijava neuspesna", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//div[contains(text(), 'Napačno geslo!')]");
                    let prijavaGumb = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]"));
                    await expect(prijavaGumb).to.not.be.empty;
                });
            });
        });

        // uredi profil
        describe("Uredi profil trenutno prijavljenega uporabnika", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Prijava uporabnika", async function() {
                it("prijava", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//a[contains(text(), 'Prijava')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Prijava')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });
            });
            context("Prijava", async function() {
                it("Prijavi se", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Prijava')]");
                    let email = await brskalnik.findElement(By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("janez.novak@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("geslo1234");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]")).click();
                });

                it("odpri profil uporabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    let povezava1 = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Ogled profila')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();
                });

                it("uredi profil uporabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Uredi profil')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Uredi profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Shrani Spremembe')]");
                    let uporabniskoIme = await brskalnik.findElement(By.css("input[name='naslov']"));
                    await expect(uporabniskoIme).to.not.be.empty;
                    await uporabniskoIme.sendKeys(Key.CONTROL + "a");
                    await uporabniskoIme.sendKeys(Key.DELETE);
                    await uporabniskoIme.sendKeys("uporabniskoIme");

                    let povezava1 = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Shrani Spremembe')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();
                });

                it("preveri veljavnost spremembe", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//td[contains(text(), 'uporabniskoIme')]");
                    let novoUporabniskoIme = await brskalnik.findElement(
                        By.xpath("//td[contains(text(), 'uporabniskoIme')]"));
                    await expect(novoUporabniskoIme).to.not.be.empty;
                })
            });
        });

        // prikaz trgovine
        describe("Nakup bota v trgovini", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Nakup", async function() {

                it("odpri profil uporabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    let povezava1 = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Ogled profila')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();
                });

                it("odpri urejanje profila", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Uredi profil')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Uredi profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });

                it("nalozi si sredstva", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Dodaj sredstva')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Dodaj sredstva')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });

                it("odpri trgovino, poglej podrobnosti in kupi bota", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//a[contains(text(), 'Trgovina')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Trgovina')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    await pocakajStranNalozena(brskalnik, 5, "//td[contains(text(), 'Bot1')]");
                    let povezava1 = await brskalnik.findElement(
                        // By.xpath("//tr[td/text() = 'Bot1']/td/button[contains(text(), 'Podrobnosti')]"));
                        By.xpath("//button[contains(text(), 'Podrobnosti')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();

                    await pocakajStranNalozena(brskalnik, 5, "//h4[contains(text(), 'Podrobnosti bota')]");
                    let povezava2 = await brskalnik.findElement(By.xpath("//div[@class='modal fade bd-example-modal-lg']//button[@class='close']"));
                    await brskalnik.sleep(500);
                    povezava2.click();

                    await pocakajStranNalozena(brskalnik, 5, "//td[contains(text(), 'Bot1')]");
                    let povezava3 = await brskalnik.findElement(
                        // By.xpath("//tr[td/text() = \"Bot1\"]/td[contains(text(), 'Nakup')]"));
                        By.xpath("//button[contains(text(), 'Nakup')]"));
                    expect(povezava3).to.not.be.empty;
                    povezava3.click();
                    await brskalnik.sleep(500);

                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Izvedi nakup')]");
                    let povezava4 = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Izvedi nakup')]"));
                    expect(povezava4).to.not.be.empty;
                    await brskalnik.sleep(500);
                    povezava4.click();

                    let povezava6 = await brskalnik.findElement(By.xpath("//div[@class='modal fade bd-example-modal-lg']//button[@class='close']"));
                    await expect(povezava6).to.not.be.empty;
                    await brskalnik.sleep(500);
                    povezava6.click();

                });
            });
        });

        // prikaz lestvice
        describe("Prikaz lestvice", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("Odpri zavihek lestvica", async function() {

                it("lestvica", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//a[contains(text(), 'Lestvica')]");
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Lestvica')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                    await brskalnik.sleep(2000);
                });

            });
        });

        // zagon bota
        describe("Upravljanje bota", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("upravljaj bota", async function() {

                it("odpri Moje trgovalne bote", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//a[contains(text(), 'Moji trgovalni boti')]");
                    await brskalnik.sleep(1000);
                    let povezava = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Moji trgovalni boti')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                });

                it("odpri/zapri podrobnosti bota", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Podrobnosti')]");
                    await brskalnik.sleep(1000);
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Podrobnosti')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    await pocakajStranNalozena(brskalnik, 5, "//h4[contains(text(), 'Podrobnosti bota')]");
                    await brskalnik.sleep(500);
                    let povezava2 = await brskalnik.findElement(By.xpath("//div[@class='modal fade bd-example-modal-lg show']//button[@class='close']"));
                    await expect(povezava2).to.not.be.empty;
                    await brskalnik.sleep(500);
                    povezava2.click();
                });

                it("zazeni bota", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Zagon')]");
                    await brskalnik.sleep(500);
                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Zagon')]"));
                    await expect(povezava).to.not.be.empty;
                    await brskalnik.sleep(500);
                    await povezava.click();

                    await pocakajStranNalozena(brskalnik, 5, "//h4[contains(text(), 'Zaženi bota')]");
                    let povezava2 = await brskalnik.findElement(By.css("input[id='parameter']"));
                    await expect(povezava2).to.not.be.empty;
                    await povezava2.sendKeys("500");
                    await brskalnik.sleep(500);

                    let povezava3 = await brskalnik.findElement(By.xpath("//button[contains(text(), 'Zaženi')]"));
                    await brskalnik.sleep(500);
                    await expect(povezava3).to.not.be.empty;
                    await brskalnik.sleep(500);
                    povezava3.click();

                    let povezava4 = await brskalnik.findElement(By.xpath("//div[@class='modal fade bd-example-modal-lg']//button[@class='close']"));
                    await brskalnik.sleep(500);
                    await expect(povezava4).to.not.be.empty;
                    await brskalnik.sleep(500);
                    povezava4.click();
                });

                it("ustavi bota", async function() {

                    await brskalnik.sleep(1000);

                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Ustavitev')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                    brskalnik.sleep(1000);
                });

                it("izbrisi bota", async function() {

                    await brskalnik.sleep(1000);

                    let povezava = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Izbriši bota')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();
                    await brskalnik.sleep(1000);
                });

            });
        });

        // odjavi se in prijavi v skrbnika
        describe("Odjava in Prijava v skrbnika in izbris uporabnika", async function() {
            this.timeout(30000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            context("funkcionalnost skrbnika", async function() {

                it("odjavi se", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    await brskalnik.sleep(1000);
                    let povezava = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(povezava).to.not.be.empty;
                    await povezava.click();

                    let povezava1 = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Odjava')]"));
                    await expect(povezava1).to.not.be.empty;
                    await povezava1.click();

                });

                it("Prijavi se", async function() {
                    await pocakajStranNalozena(brskalnik, 5,
                        "//button[contains(text(), 'Prijava')]");
                    let email = await brskalnik.findElement(By.css("input[name='email']"));
                    await expect(email).to.not.be.empty;
                    email.sendKeys("lavbo@gmail.com");

                    let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                    await expect(geslo).to.not.be.empty;
                    geslo.sendKeys("12345678");

                    brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Prijava')]")).click();
                });

                it("preveri ali je uporabnik prijavljen", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//strong[contains(text(), 'Moj profil')]");
                    let uporabnik = await brskalnik.findElement(
                        By.xpath("//strong[contains(text(), 'Moj profil')]"));
                    await expect(uporabnik).to.not.be.empty;
                });

                it("zavihek vsi uporabniki", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//a[contains(text(), 'Vsi uporabniki')]");
                    let uporabniki = await brskalnik.findElement(
                        By.xpath("//a[contains(text(), 'Vsi uporabniki')]"));
                    await expect(uporabniki).to.not.be.empty;
                    await uporabniki.click();
                });

                it("briši uporabnika", async function() {
                    await pocakajStranNalozena(brskalnik, 5, "//button[contains(text(), 'Izbris uporabnika')]");
                    let izbris = await brskalnik.findElement(
                        By.xpath("//button[contains(text(), 'Izbris uporabnika')]"));
                    await expect(izbris).to.not.be.empty;
                    await izbris.click();
                });

            });
        });

    }catch (napaka) {
            console.log("TU SEM");
            console.log(new Error(napaka.message));
        } finally {}
})();