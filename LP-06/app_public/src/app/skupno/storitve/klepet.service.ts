import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Klepet } from '../razredi/klepet';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KlepetService {

  constructor(private http: HttpClient,
    @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage) { }

  private apiUrl = environment.apiUrl;

  public pridobiKlepet(userId: string): Observable<Klepet[]> {
    const url: string = `${this.apiUrl}/chat/${userId}`;
    return this.http
      .get<Klepet[]>(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public dodajSporocilo(chatId: string, data: any): Observable<any> {
    const url: string = `${this.apiUrl}/chat/${chatId}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .put(url, data,httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  public zbrisiSporocilo(chatId: string, sporociloId: any): Observable<any> {
    const url: string = `${this.apiUrl}/chat/${chatId}/message/${sporociloId}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.shramba.getItem('zeton')}`,
      }),
    };
    return this.http
      .delete(url,httpLastnosti)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      `Prišlo je do napake ${napaka.status} z opisom ${napaka.error.sporočilo || napaka.statusText}`
    );
  }

}
