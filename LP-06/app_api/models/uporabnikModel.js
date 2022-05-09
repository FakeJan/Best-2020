const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *  schemas:
 *   PosodobiUporabnika:
 *    type: object
 *    description: Posodobitev podatkov uporabnika
 *    properties:
 *     ime:
 *      type: string
 *      example: Ime1
 *     priimek:
 *      type: string
 *      example: Priimek1
 *     uporabniskoIme:
 *      type: string
 *      example: imepriimek1
 *     email: 
 *      type: string
 *      example: imepriimek1@gmail.com
 *     geslo:
 *      type: string
 *      format: password
 *      example: Aa1
 *     slika:
 *      type: string
 *      example: 1
 *   UporabnikEmail:
 *    type: object
 *    description: Podatki uporabnika za email
 *    properties:
 *     ime:
 *      type: string
 *      description: ime uporabnika
 *      writeOnly: true
 *      example: Rok 
 *     priimek:
 *      type: string
 *      description: priimek uporabnika
 *      writeOnly: true
 *      example: Kebelj
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: imepriimek1@gmail.com
 *    required:
 *     - ime
 *     - priimek
 *     - email
 *   UporabnikPrijava:
 *    type: object
 *    description: Podatki uporabnika za prijavo
 *    properties:
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: imepriimek1@gmail.com
 *     geslo:
 *      type: string
 *      format: password
 *      example: Aa1
 *    required:
 *     - email
 *     - geslo
 *   UporabnikRegistracija:
 *    type: object
 *    description: Podatki uporabnika za registracijo
 *    properties:
 *     ime:
 *      type: string
 *      description: ime uporabnika
 *      writeOnly: true
 *      example: Rok 
 *     priimek:
 *      type: string
 *      description: priimek uporabnika
 *      writeOnly: true
 *      example: Kebelj
 *     uporabniskoIme:
 *      type: string
 *      description: uporabniško ime uporabnika
 *      writeOnly: true
 *      example: RokKebelj
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: rok@kebelj.net
 *     prvoGeslo:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - ime
 *     - priimek
 *     - uporabniskoIme
 *     - email
 *     - prvoGeslo
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Ne najdem podatkov.
 *   BranjeUporabnikov:
 *    description: Podatki dogodkov
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     ime:
 *      type: string
 *      example: Rok
 *     priimek:
 *      type: string
 *      example: Kebelj
 *     uporabniskoIme:
 *      type: string
 *      example: RokKebelj
 *     email: 
 *      type: string
 *      example: rok.kebelj@gmail.com
 *     slika:
 *      type: string
 *      example: 0
 *     created:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji ustvarjenih dogodkov
 *       example: 
 *        - 619d47feaa74a5a2d40ca8d6
 *        - 619d47feaa74a5a2d40ca8d8
 *        - 619d47feaa74a5a2d40ca8da
 *     joined:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji pridruženih dogodkov
 *       example: 
 *        - 6195807952ce72ce8fe9f096
 *        - 6195807952ce72ce8fe9f091
 *        - 6195807952ce72ce8fe9f092
 *     tip: 
 *      type: string
 *      example: navaden 
 *     zgoscenaVrednost:
 *      type: string 
 *      example: null
 *     nakljucnaVrednost:
 *      type: string
 *      example: null
 *    required: 
 *     - ime
 *     - priimek
 *     - uporabniskoIme
 *     - email
 *   BranjeUporabnika:
 *    description: Podatki uporabnika
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     ime:
 *      type: string
 *      example: Rok
 *     priimek:
 *      type: string
 *      example: Kebelj
 *     uporabniskoIme:
 *      type: string
 *      example: RokKebelj
 *     email: 
 *      type: string
 *      example: rok.kebelj@gmail.com
 *     slika:
 *      type: string
 *      example: 0
 *     created:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji ustvarjenih dogodkov
 *       example: 
 *        - 619d47feaa74a5a2d40ca8d6
 *        - 619d47feaa74a5a2d40ca8d8
 *        - 619d47feaa74a5a2d40ca8da
 *     joined:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji pridruženih dogodkov
 *       example: 
 *        - 6195807952ce72ce8fe9f096
 *        - 6195807952ce72ce8fe9f091
 *        - 6195807952ce72ce8fe9f092
 *     tip: 
 *      type: string
 *      example: navaden 
 *     zgoscenaVrednost:
 *      type: string 
 *      example: null
 *     nakljucnaVrednost:
 *      type: string
 *      example: null
 *    required: 
 *     - ime
 *     - priimek
 *     - uporabniskoIme
 *     - email
 *   BranjeUporabnikaEmail:
 *    description: Email
 *    type: object
 *    properties:
 *     email: 
 *      type: string
 *      example: imepriimek1@gmail.com
 *    required:
 *     - email
 *   BranjeUporabnikaIme:
 *    description: Uporabnisko ime
 *    type: object
 *    properties:
 *     uporabniskoIme: 
 *      type: string
 *      example: imepriimek1
 *    required:
 *     - uporabniskoIme
*/

const uporabnikShema = new mongoose.Schema({
  ime: { type: String, required: true },
  priimek: { type: String, required: true },
  uporabniskoIme: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  slika: { type: Number, default: 0, min: 0, max: 13 },
  created: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dogodek"
  }],
  joined: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dogodek"
  }],
  tip: { type: String, default: "navaden" },
  zgoscenaVrednost: { type: String, required: true },
  nakljucnaVrednost: { type: String, required: true },
});

uporabnikShema.methods.nastaviGeslo = function (geslo) {
  this.nakljucnaVrednost = crypto.randomBytes(16).toString("hex");
  this.zgoscenaVrednost = crypto
    .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, "sha512")
    .toString("hex");
};

uporabnikShema.methods.preveriGeslo = function (geslo) {
  let zgoscenaVrednost = crypto
    .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, "sha512")
    .toString("hex");
  return this.zgoscenaVrednost == zgoscenaVrednost;
};

uporabnikShema.methods.generirajJwt = function () {
  const datumPoteka = new Date();
  datumPoteka.setDate(datumPoteka.getDate() + 7);

  //properties that are not changing to mess up token when acc_set change
  return jwt.sign(
    {
      _id: this._id,
      tip: this.tip,
      exp: parseInt(datumPoteka.getTime() / 1000),
    },
    process.env.JWT_GESLO
  );
};

mongoose.model('Uporabnik', uporabnikShema, 'uporabniki');

/**
 * @swagger
 *  components:
 *   examples:
 *    NeNajdemDogodka:
 *     summary: ne najdem dogodka
 *     value:
 *      sporočilo: Ne najdem dogodka. 
 *    NeNajdemUporabnika:
 *     summary: ne najdem uporabnika
 *     value:
 *      sporočilo: Ne najdem uporabnika.
 *    NeNajdemKlepeta:
 *     summary: ne najdem klepeta
 *     value:
 *      sporočilo: Ne najdem klepeta. 
 *    NiZetona:
 *     summary: ni JWT žetona
 *     value:
 *      sporočilo: "UnauthorizedError: No authorization token was found."
 *    VsiPodatki:
 *     summary: zahtevani so vsi podatki
 *     value:
 *      sporočilo: Zahtevani so vsi podatki.
 *    EMailNiUstrezen:
 *     summary: elektronski naslov ni ustrezen
 *     value:
 *      sporočilo: Elektronski naslov ni ustrezen!
 */