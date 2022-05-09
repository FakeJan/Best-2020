import { Uporabnik } from "./uporabnik";

export class Sporocila {
    '_id': string;
    'datum': Date;
    'vsebina': string;
    'userId': Uporabnik;
}
