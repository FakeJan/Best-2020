import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  public getLocation(lat: number, lng: number) {
    const url: string = `https://eu1.locationiq.com/v1/reverse.php?key=pk.c8f81be5c2ac6477800cef2f98d2d5af&lat=${lat}&lon=${lng}&format=json`;
    return this.http
      .get(url)
      .pipe(retry(1), catchError(this.obdelajNapako));
  }

  private obdelajNapako(napaka: HttpErrorResponse) {
    return throwError(
      `Prišlo je do napake ${napaka.status} z opisom ${napaka.error.sporočilo || napaka.statusText}`
    );
  }
}
