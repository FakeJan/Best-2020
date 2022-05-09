const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   SporociloBranje:
 *    description: Sporocila klepeta
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 61a28d9de57fb93d9d6c7074
 *     datum:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z
 *     vsebina:
 *      type: string
 *      example: To je sporocilo
 *     userId:
 *      description: enolični identifikator uporabnika
 *      type: object
 *      properties:
 *       _id:
 *        type: string
 *        format: uuid
 *        description: enolični identifikator
 *        example: 619bd4d477f724f7b1c6efe3
 *       uporabniskoIme:
 *        type: string
 *        example: RokKebelj
 *       slika:
 *        type: string
 *        example: 0
 *      required:
 *       - vsebina
 *    required:
 *     - _id
 *     - vsebina
 *   DodajSporocilo:
 *    description: Podatki sporocila
 *    type: object
 *    properties:
 *     datum: 
 *      type: string
 *      format: date-time
 *      example: 2022-01-07T23:00:00.000Z
 *     vsebina:
 *      type: string
 *      example: To je novo sporocilo iz Swagger
 *     userId:
 *      type: string
 *      format: uuid
 *      example: 619bd4d477f724f7b1c6efe2
 *    required:
 *     - vsebina
 *     - userId
 */

const sporocilaShema = new mongoose.Schema({
    datum: { type: Date, default: Date.now },
    vsebina: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uporabnik"
    }
});

/**
 * @swagger
 * components:
 *  schemas:
 *   BranjeKlepetov:
 *    description: Uporabnikovi klepeti
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7235
 *     dogodekId:
 *      description: enolični identifikator dogodka
 *      type: object
 *      properties:
 *       _id:
 *        type: string
 *        format: uuid
 *        description: enolični identifikator
 *        example: 61a26530651097e5537b7231
 *       title:
 *        type: string
 *        example: Nogomet
 *       eventImage:
 *        type: string
 *        example: assets/images/events/football.png
 *     zadnjaAktivnost:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z 
 *     sporocila:
 *      type: array
 *      items:
 *       type: SporociloBranje
 *      example:
 *       - _id: 61a28d9de57fb93d9d6c7074
 *         datum: 2022-08-10T22:00:00.000Z
 *         vsebina: To je sporočilo
 *         userId:
 *          _id: 61a28d9de57fb93d9d6c7074
 *          uporabniskoIme: RokKebelj
 *          slika: 0
 *       - _id: 61a28d9de57fb93d9d6c7075
 *         datum: 2022-08-10T22:00:00.000Z
 *         vsebina: To je sporočilo 2
 *         userId:
 *          _id: 61a28d9de57fb93d9d6c7075
 *          uporabniskoIme: PaterPavel
 *          slika: 6
 *    required:
 *     - _id
 *     - dogodekId
 *     - sporocila
*/

const chatShema = new mongoose.Schema({
    dogodekId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dogodek"
    },
    zadnjaAktivnost: { type: Date, default: Date.now },
    sporocila: [sporocilaShema]
});



mongoose.model('Chat', chatShema, 'chat');



