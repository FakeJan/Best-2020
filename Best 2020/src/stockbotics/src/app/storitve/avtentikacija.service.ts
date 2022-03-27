import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { StreznikPodatkiService } from './streznik-podatki.service';
import {promise} from "selenium-webdriver";

@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  constructor(
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
    private streznikPodatkiStoritev: StreznikPodatkiService
  ) { }

  public async registracija(uporabnik: any): Promise<any> {
    // console.log(uporabnik);
    return this.streznikPodatkiStoritev
      .registracija(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('sportyeet-zeton', zeton);
  }

  //metode za prijavo
  public async prijava(uporabnik: any): Promise<any> {
    return this.streznikPodatkiStoritev
      .prijava(uporabnik)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }

  public odjava(): void {
    this.shramba.removeItem('sportyeet-zeton');
  }

  public vrniZeton(): string {
    // console.log(this.shramba.getItem('sportyeet-zeton'));
    return this.shramba.getItem('sportyeet-zeton');
  }

  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(niz),
          (znak: string) => {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };

  public jePrijavljen(): boolean {
    const zeton: string = this.vrniZeton();
    // console.log(zeton);
    if (zeton) {
      const koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      return koristnaVsebina.datumPoteka > (Date.now() / 1000);
    } else {
      return false;
    }
  }
  /*
  public posodobiDatumPrijave(): void {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {_id, uporabniskoIme, email, ime, priimek} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      var pridobljen_id = _id;
      var datumPrijave = new Date();
      this.streznikPodatkiStoritev.posodobiDatumPrijave(pridobljen_id, datumPrijave);
    }
  }
  */
  public  vrniTrenutnegaUporabnika(): Uporabnik {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { _id, uporabniskoIme, email, vloga, ime, priimek } = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      var pridobljen_id = _id;
      //console.log("Pridobi id iz zetona: "+pridobljen_id);
      //console.log("zetonska vloga: " + vloga);
      //return this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id) as Uporabnik;
      // var uporabnik: Uporabnik;
      // uporabnik = this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id);

      return { _id, uporabniskoIme, email, vloga, ime, priimek } as Uporabnik;

      //return this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id) as Promise<Uporabnik>
      // let uporabnik = this.streznikPodatkiStoritev.pridobiUporabnika(pridobljen_id) as Promise<Uporabnik>;
      // uporabnik.then(uporabnik => {return uporabnik});
      // return null;

    }
  }

}
