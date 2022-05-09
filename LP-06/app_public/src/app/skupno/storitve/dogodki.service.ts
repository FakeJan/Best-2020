import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Dogodek } from '../razredi/dogodek';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { UporabnikService } from './uporabnik.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DogodkiService {

  constructor(private http: HttpClient,
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
    private uporabnikService: UporabnikService) { }

  private apiUrl = environment.apiUrl;


  public getDogodki(params: any): Observable<any> {
    const url: string = `${this.apiUrl}/dogodki`;
    return this.http
      .get<any>(url, { params })
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public getDogodek(dogodekId: string): Observable<Dogodek> {
    if (dogodekId.trim().length == 0) {
      return new Observable<Dogodek>();
    }
    const url: string = `${this.apiUrl}/dogodki/${dogodekId}`;
    return this.http
      .get<Dogodek>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public addDogodek(dogodek: Dogodek): Observable<Dogodek> {
    console.log(dogodek);
    const url: string = `${this.apiUrl}/dogodki`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .post<Dogodek>(url, { userId: this.uporabnikService.getLoggedUser()._id, event: dogodek }, httpLastnosti
      )
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public updateDogodek(dogodek: Dogodek): Observable<Dogodek> {
    const url: string = `${this.apiUrl}/dogodki/${dogodek._id}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .put<Dogodek>(url, dogodek, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public deleteDogodek(dogodekId: string): Observable<Dogodek> {
    const url: string = `${this.apiUrl}/dogodki/${dogodekId}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .delete<Dogodek>(url, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public joinDogodek(dogodekId: string): Observable<Dogodek> {
    const url: string = `${this.apiUrl}/dogodek/pridruzi`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .put<Dogodek>(url, { userId: this.uporabnikService.getLoggedUser()._id, eventId: dogodekId }, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public leaveDogodek(dogodekId: string): Observable<Dogodek> {
    const url: string = `${this.apiUrl}/dogodek/odjavi`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      })
    };
    return this.http
      .put<Dogodek>(url, { userId: this.uporabnikService.getLoggedUser()._id, eventId: dogodekId }, httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public getPridruzeniDogodki(params: any): Observable<any> {
    const url: string = `${this.apiUrl}/dogodki/pridruzeni/${this.uporabnikService.getLoggedUser()._id}`;
    return this.http
      .get<any>(url, { params })
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public getUstvarjeniDogodki(params: any): Observable<any> {
    const url: string = `${this.apiUrl}/dogodki/ustvarjeni/${this.uporabnikService.getLoggedUser()._id}`;
    return this.http
      .get<any>(url, { params })
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public getDogodkiFiltered(data: any): Observable<any> {
    var url: string;
    if (data.location === "") {
      //url = `${this.apiUrl}/dogodkiFilter?q=619bd4d477f724f7b1c6efe2&startDate=${data.startDate}&endDate=${data.endDate}&page=${data.page}&size=${data.pageSize}`;
      url = `${this.apiUrl}/dogodkiFilter?q=${this.uporabnikService.getLoggedUser()._id}&startDate=${data.startDate}&endDate=${data.endDate}&page=${data.page}&size=${data.pageSize}`;
    } else {
      url = `${this.apiUrl}/dogodkiFilter?q=${this.uporabnikService.getLoggedUser()._id}&startDate=${data.startDate}&endDate=${data.endDate}&lng=${data.lng}&lat=${data.lat}&razdalja=${data.razdalja}&page=${data.page}&size=${data.pageSize}`;
      //url = `${this.apiUrl}/dogodkiFilter?q=619bd4d477f724f7b1c6efe2&startDate=${data.startDate}&endDate=${data.endDate}&lng=${data.lng}&lat=${data.lat}&razdalja=${data.razdalja}&page=${data.page}&size=${data.pageSize}`;
    }
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public dogodekVreme(coordinates: number[]): any {
    return this.http
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[1]}&lon=${coordinates[0]}&exclude=current,minutely,hourly&appid=096504780fe605e465031f9803d0b902`)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public dogodekLokacija(lokacija: string) {
    return this.http
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${lokacija}&limit=1&appid=14472f0ae561d135238e5d43702a22a8`)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      `Prišlo je do napake ${napaka.status} z opisom ${napaka.error.sporočilo || napaka.statusText}`
    );
  }
}
