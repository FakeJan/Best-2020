import { Sporocila } from './sporocila';
import { Dogodek } from './dogodek';

export class Klepet {
    '_id': string;
    'dogodekId': Dogodek;
    'zadnjaAktivnost': Date;
    'sporocila': Sporocila[];

}
