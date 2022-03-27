import { ZgodovinskiPodatek } from "./zgodovinskiPodatek";

export class Podjetje {
  _id: string;
  ime: string;
  sektor: string;
  simbol: string;
  valuta: string;
  seznamZgodovinskihPodatkov: ZgodovinskiPodatek[];
}
