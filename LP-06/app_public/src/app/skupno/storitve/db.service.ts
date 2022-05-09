import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  private apiUrl =  environment.apiUrl;

  public naloziPodatke(): Observable<any> {
    const url: string = `${this.apiUrl}/db/podatki/vnos`;
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public zbrisiPodatke(): Observable<any> {
    const url: string = `${this.apiUrl}/db/podatki/odstranitev`;
    return this.http
      .get<any>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      `Prišlo je do napake ${napaka.status} z opisom ${napaka.error.sporočilo || napaka.statusText}`
    );
  }

}
