import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import {Bot} from "../razredi/bot";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StreznikPodatkiService {

  // private apiUrl = 'https://tpo-14-stockbotics.herokuapp.com/api';
  // private apiUrl = 'http://localhost:3000/api';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // private returnHeader(): any {
  //   return {
  //     headers: new HttpHeaders({
  //       'Authorization'
  //     })
  //   }
  // }

  public helloWorld(): Promise<any> {
    const url: string = `${this.apiUrl}/hello-world`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor);
  }

  public vrniNapovedi(): Promise<any> {
    const url: string = `${this.apiUrl}/napovedi`;
    return this.http
      .get(url)
      .toPromise()
      .then(napovedi => napovedi);
  }

  private obdelajNapako(err:any): Promise<any>{
    console.error('Prišlo je do napake', err);
    return Promise.reject(err.message || err);
  }

  public registracija(uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('registracija', uporabnik);
  }

  private avtentikacija(urlNaslov: string, uporabnik: Uporabnik): Promise<RezultatAvtentikacije> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    // console.log(uporabnik);
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(rezultat => rezultat as RezultatAvtentikacije)
      .catch(this.obdelajNapako);
  }

  public prijava(uporabnik: any): Promise<RezultatAvtentikacije> {
    return this.avtentikacija('prijava', uporabnik);
  }

  public async preveriGesloUporabnika(uporabnik: any): Promise<boolean> {
    const url: string = `${this.apiUrl}/uporabniki/${uporabnik.id}/preveri-geslo`;
    // console.log(uporabnik);
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(function () {
        console.log("return true");
        return true;},
        function () {
          console.log("return false");
        return false;
      })
      .catch(this.obdelajNapako);
  }

  public async spremeniGesloUporabnika(uporabnik: any): Promise<boolean> {
    const url: string = `${this.apiUrl}/uporabniki/${uporabnik.id}/spremeni-geslo`;
    // console.log(uporabnik);
    return this.http
      .post(url, uporabnik)
      .toPromise()
      .then(function () {
          console.log("return true");
          return true;},
        function () {
          console.log("return false");
          return false;
        })
      .catch(this.obdelajNapako);
  }

  public pridobiUporabnika(id: string): Promise<Uporabnik> {
    const url: string = `${this.apiUrl}/uporabniki/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Uporabnik)
      .catch(this.obdelajNapako);
  }

  public posodobiProfil(idUporabnika: string, podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}`;
    console.log(podatkiObrazca);
    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public izbrisiBotaKnjiznice(idUporabnika: string, podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}/knjiznica/izbris`;
    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }



  //posodobitev denarnih sredstev uporabnika
  public posodobiSredstva(idUporabnika: string, podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}/denar`;
    console.log(podatkiObrazca);
    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public posodobiVlogo(idUporabnika: string, podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}/vloga`;
    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public vrniVseUporabnike(): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki`;
    return this.http
      .get(url)
      .toPromise();
  }

  public izbrisiUporabnika(idUporabnika: string): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(odgovor => odgovor as any);
  }

  public vrniVseBote(): Promise<any> {
    const url: string = `${this.apiUrl}/boti`;
    return this.http
      .get(url)
      .toPromise();
  }

  public kupiBota(idUporabnika: string, podatkiObrazca: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabniki/${idUporabnika}/nakup`;
    console.log("url nakupa bota "+ url);
    console.log(podatkiObrazca);
    return this.http
      .put(url, podatkiObrazca)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  public vstaviDb(): Promise<any> {
    const url: string = `${this.apiUrl}/db/vstavi`;
    return this.http
      .post(url, null)
      .toPromise();
  }

  public izbrisiDb(): Promise<any> {
    const url: string = `${this.apiUrl}/db/izbrisi`;
    return this.http.delete(url).toPromise();
  }

  public prikaziDomacoStran(): Promise<any> {
    const url: string = `${this.apiUrl}/domaca-stran`;
    return this.http
      .get(url)
      .toPromise();
  }

  public prikaziZgodovinskePodatke(simbol: string): Promise<any> {
    const url: string = `${this.apiUrl}/delnice/${simbol}`;
    return this.http
      .get(url)
      .toPromise();
  }

  public zacniTrgovanje(bot: Bot, parameter: string): Promise<any> {
    const url: string = `${this.apiUrl}/trgovanje/zazeni`;
    const req = {
       bot: bot,
       parameterInvesticije: parameter
    };
    return this.http
      .post(url, req)
      .toPromise();
  }

  public ustaviTrgovanje(bot: Bot): Promise<any> {
    const url: string = `${this.apiUrl}/trgovanje/zaustavi`;
    return this.http
      .post(url, bot)
      .toPromise();
  }
}
