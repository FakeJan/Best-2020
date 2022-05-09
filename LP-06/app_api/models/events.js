const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *   BranjeDogodka:
 *    description: Podatki dogodkov
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     title:
 *      type: string
 *      example: Nogomet
 *     eventImage:
 *      type: string
 *      example: assets/images/events/football.png
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z
 *     city: 
 *      type: string
 *      example: 8000 Novo Mesto
 *     address:
 *      type: string
 *      example: Črmošnjice pri Stopičah
 *     coordinates: 
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Šport
 *       - Nogomet
 *       - Zunaj
 *     participantMax:
 *      type: integer
 *      example: 11
 *     description:
 *      type: string
 *      example: Igrali bomo nogomet na travi
 *     users:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji uporabnikov
 *       example: 
 *        - 619bd4d477f724f7b1c6efe2
 *        - 619bd4d477f724f7b1c6efe3
 *        - 619bd4d477f724f7b1c6efe5   
 *    required: 
 *     - title
 *     - date
 *     - city
 *     - address
 *     - participantMax 
 *   BranjeEnegaDogodka:
 *    description: Podatki želenega dogodka
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     title:
 *      type: string
 *      example: Nogomet
 *     eventImage:
 *      type: string
 *      example: assets/images/events/football.png
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z
 *     city: 
 *      type: string
 *      example: 8000 Novo Mesto
 *     address:
 *      type: string
 *      example: Črmošnjice pri Stopičah
 *     coordinates: 
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Šport
 *       - Nogomet
 *       - Zunaj
 *     participantMax:
 *      type: integer
 *      example: 11
 *     description:
 *      type: string
 *      example: Igrali bomo nogomet na travi
 *     users:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji uporabnikov
 *       example: 
 *        - 619bd4d477f724f7b1c6efe2
 *        - 619bd4d477f724f7b1c6efe3
 *        - 619bd4d477f724f7b1c6efe5   
 *    required: 
 *     - title
 *     - date
 *     - city
 *     - address
 *     - participantMax
 *   PridobiUstvarjeneDogodke:
 *    description: Dogodki, ki jih je ustvaril uporabnik
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     title:
 *      type: string
 *      example: Nogomet
 *     eventImage:
 *      type: string
 *      example: assets/images/events/football.png
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z
 *     city: 
 *      type: string
 *      example: 8000 Novo Mesto
 *     address:
 *      type: string
 *      example: Črmošnjice pri Stopičah
 *     coordinates: 
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Šport
 *       - Nogomet
 *       - Zunaj
 *     participantMax:
 *      type: integer
 *      example: 11
 *     description:
 *      type: string
 *      example: Igrali bomo nogomet na travi
 *     users:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji uporabnikov
 *       example: 
 *        - 619bd4d477f724f7b1c6efe2
 *        - 619bd4d477f724f7b1c6efe3
 *        - 619bd4d477f724f7b1c6efe5   
 *    required: 
 *     - title
 *     - date
 *     - city
 *     - address
 *     - participantMax
 *   PridobiPridruzeneDogodke:
 *    description: Dogodki, ki se jih bo udeležil uporabnik
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     title:
 *      type: string
 *      example: Nogomet
 *     eventImage:
 *      type: string
 *      example: assets/images/events/football.png
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z
 *     city: 
 *      type: string
 *      example: 8000 Novo Mesto
 *     address:
 *      type: string
 *      example: Črmošnjice pri Stopičah
 *     coordinates: 
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Šport
 *       - Nogomet
 *       - Zunaj
 *     participantMax:
 *      type: integer
 *      example: 11
 *     description:
 *      type: string
 *      example: Igrali bomo nogomet na travi
 *     users:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji uporabnikov
 *       example: 
 *        - 619bd4d477f724f7b1c6efe2
 *        - 619bd4d477f724f7b1c6efe3
 *        - 619bd4d477f724f7b1c6efe5   
 *    required: 
 *     - title
 *     - date
 *     - city
 *     - address
 *     - participantMax  
 *   BranjeFiltriranegaDogodka:
 *    description: Podatki filtriranih dogodkov
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 61a26530651097e5537b7231
 *     title:
 *      type: string
 *      example: Nogomet
 *     eventImage:
 *      type: string
 *      example: assets/images/events/football.png
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2022-08-10T22:00:00.000Z
 *     city: 
 *      type: string
 *      example: 8000 Novo Mesto
 *     address:
 *      type: string
 *      example: Črmošnjice pri Stopičah
 *     coordinates: 
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Šport
 *       - Nogomet
 *       - Zunaj
 *     participantMax:
 *      type: integer
 *      example: 11
 *     description:
 *      type: string
 *      example: Igrali bomo nogomet na travi
 *     users:
 *      type: array
 *      items:
 *       type: string
 *       format: uuid
 *       description: enolični identifikatorji uporabnikov
 *       example: 
 *        - 619bd4d477f724f7b1c6efe2
 *        - 619bd4d477f724f7b1c6efe3
 *        - 619bd4d477f724f7b1c6efe5
 *     razdalja:
 *      type: number
 *      example: 2792.8
 *     results:
 *      type: boolean
 *      example: true
 *    required: 
 *     - title
 *     - date
 *     - city
 *     - address
 *     - participantMax
 *   DodajanjeDogodka:
 *    type: object
 *    properties:
 *     userId:
 *      type: string
 *      format: uuid
 *      description: enolični identifikatorji uporabnikov 
 *      example: 619bd4d477f724f7b1c6efe2
 *     event:
 *      description: Podatki dogodka
 *      type: object
 *      properties:
 *       title:
 *        type: string
 *        example: Naslov dogodka
 *       eventImage:
 *        type: string
 *        example: assets/images/events/football.png
 *       city:
 *        type: string
 *        example: 8000 Novo mesto
 *       address:
 *        type: string
 *        example: Črmošnjice pri Stopičah
 *       coordinates: 
 *        type: array
 *        items:
 *         type: number
 *        example:
 *         - 14.883872
 *         - 46.188109
 *       date:
 *        type: string
 *        format: date-time
 *        example: 2022-01-07T23:00:00.000Z
 *       tags:
 *        type: array
 *        items:
 *         type: string
 *        example:
 *         - Šport
 *         - Nogomet
 *         - Zunaj
 *       participantMax:
 *        type: number
 *        example: 11
 *       description:
 *        type: string
 *        example: Opis dogodka
 *      required: 
 *       - title
 *       - eventImage
 *       - city
 *       - address
 *       - coordinates
 *       - date
 *       - tags
 *       - participantMax
 *       - description
 *    required: 
 *      - userId
 *      - event 
 *   PosodabljanjeDogodka:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *      example: Naslov dogodka
 *     eventImage:
 *      type: string
 *      example: assets/images/events/football.png
 *     city:
 *      type: string
 *      example: 8000 Novo mesto
 *     address:
 *      type: string
 *      example: Črmošnjice pri Stopičah
 *     coordinates: 
 *      type: array
 *      items:
 *       type: number
 *      example:
 *       - 14.883872
 *       - 46.188109
 *     date:
 *      type: string
 *      format: date-time
 *      example: 2022-01-07T23:00:00.000Z
 *     tags:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - Šport
 *       - Nogomet
 *       - Zunaj
 *     participantMax:
 *      type: number
 *      example: 11
 *     description:
 *      type: string
 *      example: Opis dogodka
 *    required: 
 *     - title
 *     - eventImage
 *     - city
 *     - address
 *     - coordinates
 *     - date
 *     - tags
 *     - participantMax
 *     - description 
 *   PridruzitevDogodku:
 *    description: Dodaj uporabnika dogodku
 *    type: object
 *    properties:
 *     userId:
 *      type: string
 *      example: 619bd4d477f724f7b1c6efe2
 *     eventId:
 *      type: string
 *      example: 61a26835607c838c00b70a09
 *    required:
 *     - userId
 *     - eventId
 */

const eventShema = new mongoose.Schema({
    title: { type: String, required: true },
    eventImage: { type: String },
    date: { type: Date, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { type: [Number], index: "2dsphere" },
    tags: [String],
    participantMax: { type: Number, required: true },
    description: { type: String },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Uporabnik"
    }],
})

mongoose.model('Dogodek', eventShema, 'dogodki');