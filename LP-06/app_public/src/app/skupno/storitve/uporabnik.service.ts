import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


import { Uporabnik } from '../razredi/uporabnik';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { AnyArray } from 'mongoose';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UporabnikService {

  public loggedUser: Uporabnik = new Uporabnik();

  constructor(private http: HttpClient,
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage) { }

  private apiUrl = environment.apiUrl;

  public preveriObstojEmail(prijava: any): Observable<Uporabnik> {
    const url: string = `${this.apiUrl}/uporabniki/email`;
    return this.http
      .post<Uporabnik>(url, prijava)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public preveriObstojUporabniskoIme(registracija: any): Observable<Uporabnik> {
    const url: string = `${this.apiUrl}/uporabniki/uporabniskoIme`;
    return this.http
      .post<Uporabnik>(url, registracija)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  //TODO tega se ne bo vec uporabljalo
  // public dodajNovegaUporabnika(registracija: any): Observable<Uporabnik> {
  //   const url: string = `${this.apiUrl}/uporabniki`;
  //   return this.http
  //     .post<Uporabnik>(url, registracija)
  //     .pipe(retry(1), catchError(this.obdelajNapako));
  // }
  public posodobiUporabnika(uporabnik: Uporabnik): Observable<Uporabnik> {
    const url: string = `${this.apiUrl}/uporabniki/${uporabnik._id}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .put<Uporabnik>(url, uporabnik,httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }


  public posliEmail(registracija: any) {
    const url: string = `${this.apiUrl}/uporabniki/potrditveni_email`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .post(url, registracija,httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public getLoggedUser(): any {
    var uporabnikString = this.shramba.getItem("uporabnik");
    if (uporabnikString != null) {
      this.loggedUser=JSON.parse(uporabnikString);
     return JSON.parse(uporabnikString);
    }
    return null;
  }
  public setLoggedUser(uporabnik: Uporabnik) {
    //this.narediKopijoUporabnika(this.loggedUser,uporabnik);
    this.loggedUser=uporabnik;
    this.shramba.setItem("uporabnik",JSON.stringify(this.loggedUser));
  }

  public narediKopijoUporabnika(uporabnikA: Uporabnik, uporabnikB: Uporabnik) {
    uporabnikA._id = uporabnikB._id;
    uporabnikA.ime = uporabnikB.ime;
    uporabnikA.priimek = uporabnikB.priimek;
    uporabnikA.email = uporabnikB.email;
    uporabnikA.uporabniskoIme = uporabnikB.uporabniskoIme;
    uporabnikA.slika = uporabnikB.slika;
    uporabnikA.geslo = uporabnikB.geslo;
    uporabnikA.created = uporabnikB.created;
    uporabnikA.joined = uporabnikB.joined;
  }

  public getUsers(): Observable<Uporabnik[]> {
    const url: string = `${this.apiUrl}/uporabniki`;
    return this.http
      .get<Uporabnik[]>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public deleteUser(userId: string) {
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    const url: string = `${this.apiUrl}/uporabniki/${userId}`;
    return this.http
      .delete(url,httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  //5.1 avtentikacija
  public prijava(uporabnik: any): Observable<any> {
    this.loggedUser=new Uporabnik();
    return this.avtentikacija('prijava', uporabnik);
  }

  public registracija(uporabnik: any): Observable<any> {
    this.loggedUser=new Uporabnik();
    return this.avtentikacija('registracija', uporabnik);
  }

  private avtentikacija(
    urlNaslov: string,
    uporabnik: any
  ): Observable<any> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    return this.http
      .post<any>(url, uporabnik)
      .pipe(retry(1), catchError(this.vrniNapako));
  }

  private vrniNapako(napaka: HttpErrorResponse) {
    return throwError(
      `${napaka.error.sporočilo || napaka.statusText}`
    );
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      `Prišlo je do napake ${napaka.status} z opisom ${napaka.error.sporočilo || napaka.statusText}`
    );
  }
}
