const express = require("express");
const router = express.Router();

const jwt = require("express-jwt");
const avtentikacija = jwt({
  secret: process.env.JWT_GESLO,
  userProperty: "payload",
  algorithms: ["HS256"],
});

const ctrlDb = require("../controllers/dbController");
const ctrlDogodki = require("../controllers/dogodki");
const ctrlUporabniki = require("../controllers/uporabniki");
const ctrlChat = require("../controllers/chat");
const ctrlAvtentikacija = require("../controllers/avtentikacija");

/**
 * @swagger
 * tags:
 *  - name: Dogodki
 *    description: Obvladovanje dogodkov
 *  - name: Uporabniki
 *    description: Obvladovanje uporabnikov
 *  - name: Chat
 *    description: Obvladovanje klepetov dogodkov
 *  - name: Avtentikacija
 *    description: Obvladovanje avtentikacije uporabnikov
 */

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

/* Dogodki */
router.get("/dogodki", ctrlDogodki.dogodkiPreberiVse);
/**
 * @swagger
 *  /dogodki:
 *   get:
 *    summary: Seznam dogodkov
 *    description: Pridobitev vseh dogodkov
 *    tags: [Dogodki]
 *    parameters:
 *     - in: query
 *       name: page
 *       description: trenutna stran
 *       schema:
 *        type: number
 *       required: true
 *       example: 0
 *     - in: query
 *       name: size
 *       description: število podatkov 
 *       schema:
 *        type: number
 *       required: true
 *       example: 10
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom dogodkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/BranjeDogodka"
 *     "404":
 *      description: Ne najdem dogodkov
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Ne najdem dogodkov
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.get("/dogodki/:idDogodki", ctrlDogodki.dogodkiPreberiIzbranega);
/**
 * @swagger
 *  /dogodki/{idDogodki}:
 *   get:
 *    summary: Podrobnosti dogodka
 *    description: Pridobitev podrobnosti podanega dogodka
 *    tags: [Dogodki]
 *    parameters:
 *     - in: path
 *       name: idDogodki
 *       description: enolični identifikator dogodka
 *       schema:
 *        type: string
 *       required: true
 *       example: 61a26530651097e5537b7231
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z želenim dogodkom. 
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/BranjeEnegaDogodka"
 *     "404":
 *      description: Napaka zahteve, zahtevanega dogodka ni mogoče najti
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem dogodka:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.get("/dogodkiFilter", ctrlDogodki.dogodkiSeznamPoRazdalji);
/**
 * @swagger
 *  /dogodkiFilter:
 *   get:
 *    summary: Seznam 
 *    description: Pridobitev dogodkov glede na podane filtre
 *    tags: [Dogodki]
 *    parameters:
 *     - in: query
 *       name: q
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: 619bd4d477f724f7b1c6efe2
 *     - in: query
 *       name: startDate
 *       description: spodnja meja datuma 
 *       schema:
 *        type: string
 *       required: true
 *       example: Tue Dec 07 2021 00:00:00 GMT+0100 
 *     - in: query
 *       name: endDate
 *       description: zgornja meja datuma 
 *       schema:
 *        type: string
 *       required: true
 *       example: Tue Jan 04 2022 00:00:00 GMT+0100
 *     - in: query
 *       name: lng
 *       description: longitude
 *       schema:
 *        type: number
 *       required: true
 *       example: 15.1696684
 *     - in: query
 *       name: lat
 *       description: latitude
 *       schema:
 *        type: number
 *       required: true
 *       example: 45.8040475
 *     - in: query
 *       name: razdalja
 *       description: polmer od izbrane točke
 *       schema:
 *        type: number
 *       required: true
 *       example: 5
 *     - in: query
 *       name: page
 *       description: trenutna stran
 *       schema:
 *        type: number
 *       required: true
 *       example: 0
 *     - in: query
 *       name: size
 *       description: število podatkov 
 *       schema:
 *        type: number
 *       required: true
 *       example: 10
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom filtriranih dogodkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/BranjeFiltriranegaDogodka"
 *     "404":
 *      description: Ne najdem uporabnika s podanim enoličnim identifikatorjem.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem dogodka:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"   
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.get("/dogodki/ustvarjeni/:id", ctrlDogodki.dogodkiPreberiUstvarjene);
/**
 * @swagger
 *  /dogodki/ustvarjeni/{id}:
 *   get:
 *    summary: Dogodki od uporabnika
 *    description: Pridobitev dogodkov, ki jih je ustvaril podan uporabnik
 *    tags: [Dogodki]
 *    parameters:
 *     - in: path
 *       name: id
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: 619bd4d477f724f7b1c6efe2
 *     - in: query
 *       name: page
 *       description: trenutna stran
 *       schema:
 *        type: number
 *       required: true
 *       example: 0
 *     - in: query
 *       name: size
 *       description: število podatkov 
 *       schema:
 *        type: number
 *       required: true
 *       example: 10
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z uporabnikovimi dogodki. 
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/PridobiUstvarjeneDogodke"
 *     "404":
 *      description: Ne najdem uporabnika s podanim enoličnim identifikatorjem.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *         ne najdem dogodka:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.get("/dogodki/pridruzeni/:id", ctrlDogodki.dogodkiPreberiPridruzene);
/**
 * @swagger
 *  /dogodki/pridruzeni/{id}:
 *   get:
 *    summary: Pridruženi dogodki uporabnika
 *    description: Pridobitev dogodkov, ki se jih bo udeležil uporabnik
 *    tags: [Dogodki]
 *    parameters:
 *     - in: path
 *       name: id
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: 619bd4d477f724f7b1c6efe2
 *     - in: query
 *       name: page
 *       description: trenutna stran
 *       schema:
 *        type: number
 *       required: true
 *       example: 0
 *     - in: query
 *       name: size
 *       description: število podatkov 
 *       schema:
 *        type: number
 *       required: true
 *       example: 10
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s pridruženimi dogodki. 
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/PridobiPridruzeneDogodke"
 *     "404":
 *      description: Ne najdem uporabnika s podanim enoličnim identifikatorjem.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *         ne najdem dogodka:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.post("/dogodki", avtentikacija, ctrlDogodki.dogodkiKreiraj);
/**
 * @swagger
 *  /dogodki:
 *   post:
 *    summary: Dodajanje novega dogodka
 *    description: Dodajanje novega dogodka 
 *    tags: [Dogodki]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o dogodku
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/DodajanjeDogodka"
 *    responses:
 *     "201":
 *      description: Uspešno dodan dogodek, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BranjeDogodka"
 *     "400":
 *      description: Napaka pri shranjevanju dogodka.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 */

router.put("/dogodki/:idDogodki", avtentikacija, ctrlDogodki.dogodkiPosodobiIzbranega);
/**
 * @swagger
 *  /dogodki/{idDogodki}:
 *   put:
 *    summary: Posodabljanje izbranega dogodka
 *    description: Posodobitev izbranega dogodka
 *    tags: [Dogodki]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idDogodki
 *       description: enolični identifikator dogodka
 *       schema:
 *        type: string
 *       required: true
 *    requestBody:
 *     description: Podatki o dogodku
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/PosodabljanjeDogodka"
 *    responses:
 *     "200":
 *      description: Uspešno posodobljen dogodek, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BranjeDogodka"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve pri ažuriranju dogodka
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "500":
 *      description: Napaka pri dostopu do podatkovne baze.
 */

router.put("/dogodek/pridruzi", avtentikacija, ctrlDogodki.dogodkiPridruziUporabnika);
/**
 * @swagger
 *  /dogodek/pridruzi:
 *   put:
 *    summary: Pridruži se dogodku
 *    description: Pridruži uporabnika dogodku
 *    tags: [Dogodki]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o lokaciji
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/PridruzitevDogodku"
 *    responses:
 *     "200":
 *      description: Uspešno pridružitev dogodku, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BranjeDogodka"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve pri ažuriranju dogodka
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "500":
 *      description: Napaka pri dostopu do podatkovne baze.
 */

router.put("/dogodek/odjavi", avtentikacija, ctrlDogodki.dogodkiOdstraniUporabnika);
/**
 * @swagger
 *  /dogodek/odjavi:
 *   put:
 *    summary: Odjavi se od dogodka
 *    description: Odjavi uporabnika od dogodka
 *    tags: [Dogodki]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o lokaciji
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/PridruzitevDogodku"
 *    responses:
 *     "200":
 *      description: Uspešna odjava od dogodka, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BranjeDogodka"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve pri ažuriranju dogodka
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem lokacije:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "500":
 *      description: Napaka pri dostopu do podatkovne baze.
 */

router.delete("/dogodki/:idDogodki", avtentikacija, ctrlDogodki.dogodkiIzbrisiIzbranega);
/**
 * @swagger
 *  /dogodki/{idDogodki}:
 *   delete:
 *    summary: Brisanje izbranega dogodka
 *    description: Brisanje izbranega dogodka.
 *    tags: [Dogodki]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idDogodki
 *       description: enolični identifikator lokacije
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan dogodek.
 *     "404":
 *      description: Napaka zahteve, zahtevanega dogodka ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem dogodka:
 *          $ref: "#/components/examples/NeNajdemDogodka"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "500":
 *      description: Napaka pri brisanju lokacije.
 */

/* Uporabniki */
router.get("/uporabniki", ctrlUporabniki.pridobiUporabnike);
/**
 * @swagger
 *  /uporabniki:
 *   get:
 *    summary: Seznam uporabnikov
 *    description: Pridobitev vseh **uporabnikov**
 *    tags: [Uporabniki]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z uporabniki v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/BranjeUporabnikov"
 *     "404":
 *      description: Ne najdem uporabnikov
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Ne najdem uporabnikov
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.get("/uporabniki/:idUporabnika", ctrlUporabniki.pridobiUporabnika);
/**
 * @swagger
 *  /uporabniki/{idUporabnika}:
 *   get:
 *    summary: Pridobi uporabnika
 *    description: Pridobitev podrobnosti podanega uporabnika
 *    tags: [Uporabniki]
 *    parameters:
 *     - in: path
 *       name: idUporabnika
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: 619bd4d477f724f7b1c6efe2
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z uporabnikom v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/BranjeUporabnika"
 *     "404":
 *      description: Ne najdem uporabnika
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uorabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

//router.post("/uporabniki", avtentikacija, ctrlUporabniki.dodajUporabnika);
//preverjanje obstaja emaila in uporabniskega imena ob registraciji
router.post("/uporabniki/email", ctrlUporabniki.pridobiUporabnikaEmail);
/**
 * @swagger
 *  /uporabniki/email:
 *   post:
 *    summary: Pridobitev uporabnika
 *    description: Pridobitev uporabnika z emailom
 *    tags: [Uporabniki]
 *    requestBody:
 *     description: Email
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/BranjeUporabnikaEmail"
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z uporabnikom v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/BranjeUporabnika"
 *     "404":
 *      description: Ne najdem uporabnika
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uorabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.post("/uporabniki/uporabniskoIme", ctrlUporabniki.pridobiUporabnikaUporabniskoIme);
/**
 * @swagger
 *  /uporabniki/uporabniskoIme:
 *   post:
 *    summary: Pridobitev uporabnika
 *    description: Pridobitev uporabnika s uporabniškim imenom
 *    tags: [Uporabniki]
 *    requestBody:
 *     description: Uporabniško ime
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/BranjeUporabnikaIme"
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z uporabnikom v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/BranjeUporabnika"
 *     "404":
 *      description: Ne najdem uporabnika
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uorabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.post("/uporabniki/potrditveni_email", avtentikacija, ctrlUporabniki.posliPotrditveniEmail);
/**
 * @swagger
 *  /uporabniki/potrditveni_email:
 *   post:
 *    summary: Email ob uspešni registraciji
 *    description: Email ob uspešni registraciji
 *    tags: [Uporabniki]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o uporabniku
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/UporabnikEmail"
 *    responses:
 *     "201":
 *      description: Uspešno poslan email.
 *     "400":
 *      description: Napaka pri pošiljanju emaila. 
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "500":
 *      description: Napaka na strežniku pri preverjanju uporabnika.
 */

router.put("/uporabniki/:idUporabnika", avtentikacija, ctrlUporabniki.posodobiUporabnika);
/**
 * @swagger
 *  /uporabniki/{idUporabnika}:
 *   put:
 *    summary: Posodobite podatkov
 *    description: Posodobitev podatkov od uporabnika
 *    tags: [Uporabniki]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUporabnika
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *       example: 619bd4d477f724f7b1c6efe2
 *    requestBody:
 *     description: Podatki uporabnika
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/PosodobiUporabnika"
 *    responses:
 *     "200":
 *      description: Uspešno posodobljen uporabnik
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/BranjeUporabnikov"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevanega uporabnika ni mogoče najti. 
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *     "500":
 *      description: Napaka pri iskanju lokacije.
 */

router.delete("/uporabniki/:idUporabnika", avtentikacija, ctrlUporabniki.odstraniUporabnika);
/**
 * @swagger
 *  /uporabniki/{idUporabnika}:
 *   delete:
 *    summary: Brisanje izbranega uporabnika
 *    description: Brisanje izbranega uporabnika.
 *    tags: [Uporabniki]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUporabnika
 *       description: enolični identifikator uporabnika
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan dogodek.
 *     "404":
 *      description: Napaka zahteve, zahtevanega dogodka ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "500":
 *      description: Napaka pri brisanju lokacije.
 */

/* Chat */
router.get("/chat/:userId", ctrlChat.pridobiChat);
/**
 * @swagger
 *  /chat/{userId}:
 *   get:
 *    summary: Pridobi klepete uporabnika
 *    description: Pridobitev klepetov od uporabnika
 *    tags: [Chat]
 *    parameters:
 *     - in: path
 *       name: userId
 *       description: enolični identifikator klepeta
 *       schema:
 *        type: string
 *       required: true
 *       example: 619bd4d477f724f7b1c6efe2
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z uporabnikovimi klepeti v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/BranjeKlepetov"
 *     "404":
 *      description: Ne najdem uporabnika s podanim enoličnim identifikatorjem.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem uporabnika:
 *          $ref: "#/components/examples/NeNajdemUporabnika"
 *         ne najdem klepeta:
 *          $ref: "#/components/examples/NeNajdemKlepeta"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */

router.put("/chat/:chatId", avtentikacija, ctrlChat.sporociloKreiraj);
/**
 * @swagger
 *  /chat/{chatId}:
 *   put:
 *    summary: Dodajanje sporočila v klepet
 *    description: Dodajanje sporočila v klepet
 *    tags: [Chat]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: chatId
 *       description: enolični identifikator klepeta
 *       schema:
 *        type: string
 *       required: true
 *       example: 61a26530651097e5537b7235
 *    requestBody:
 *     description: Podatki sporočila
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/DodajSporocilo"
 *    responses:
 *     "200":
 *      description: Uspešno dodano sporočilo.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/SporociloBranje"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevane lokacije oz. komentarja ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem klepeta:
 *          $ref: "#/components/examples/NeNajdemKlepeta"
 *     "500":
 *      description: Napaka pri iskanju lokacije.
 */

router.delete("/chat/:chatId/message/:messageId", avtentikacija, ctrlChat.odstraniChatDogodka);
/**
 * @swagger
 *  /chat/{chatId}/message/{messageId}:
 *   delete:
 *    summary: Brisanje sporočila
 *    description: Brisanje sporočila v klepetu
 *    tags: [Chat]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: chatId
 *       description: enolični identifikator klepeta
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: messageId
 *       description: enolični identifikator sporočila
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisano sporočilo.
 *     "404":
 *      description: Napaka zahteve, zahtevanega klepeta ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem klepeta:
 *          $ref: "#/components/examples/NeNajdemKlepeta"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "500":
 *      description: Napaka pri brisanju lokacije.
 */

/* Avtentikacija */
router.post("/registracija", ctrlAvtentikacija.registracija);
/**
 * @swagger
 *   /registracija:
 *     post:
 *       summary: Registracija novega uporabnika
 *       description: Registracija **novega uporabnika** s podatki o imenu, elektronskem naslovu in geslu.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za registracijo
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikRegistracija"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, priimek, uporabnisko ime, email in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               examples:
 *                 vsi podatki:
 *                   $ref: "#/components/examples/VsiPodatki"
 *                 elektronski naslov ni ustrezen:
 *                   $ref: "#/components/examples/EMailNiUstrezen"
 *         "409":
 *           description: Napaka zahteve, uporabnik že obstaja.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Uporabnik s tem elektronskim naslovom je že registriran.
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */

router.post("/prijava", ctrlAvtentikacija.prijava);
/**
 * @swagger
 *   /prijava:
 *     post:
 *       summary: Prijava obstoječega uporabnika
 *       description: Prijava **obstoječega uporabnika** z elektronskim naslovom in geslom.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Prijavni podatki
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UporabnikPrijava"
 *       responses:
 *         "200":
 *           description: Uspešna prijava uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Zahtevani so vsi podatki.
 *         "401":
 *           description: Napaka pri prijavi uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               examples:
 *                 elektronski naslov:
 *                   value:
 *                     sporočilo: Napačen elektronski naslov.
 *                   summary: napačen elektronski naslov
 *                 geslo:
 *                   value:
 *                     sporočilo: Napačno geslo.
 *                   summary: napačno geslo
 *         "500":
 *           description: Napaka na strežniku pri preverjanju uporabnika.
 */

//db tu ne rabmo
router.get("/db/podatki/vnos", ctrlDb.dbVnos);
router.get("/db/podatki/odstranitev", ctrlDb.dbOdstranitev);

module.exports = router;