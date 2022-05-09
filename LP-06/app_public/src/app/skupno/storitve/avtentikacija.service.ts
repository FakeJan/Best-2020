import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';
import { Uporabnik } from '../razredi/uporabnik';
import { UporabnikService } from './uporabnik.service';

@Injectable({
  providedIn: 'root'
})
export class AvtentikacijaService {

  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
  private uporabnikService: UporabnikService) {}

  public vrniZeton(): string | null {
    return this.shramba.getItem('zeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.removeItem('zeton');
    this.shramba.setItem('zeton', zeton);
  }

  public vrniUporabnika(): string | null {
    return this.shramba.getItem('uporabnik');
  }

  public shraniUporabnika(uporabnik: any): void {
    this.shramba.removeItem('uporabnik');
    this.shramba.setItem('uporabnik', JSON.stringify(uporabnik));
  }

  public odjava(): void {
    this.shramba.removeItem('uporabnik');
    this.shramba.removeItem('zeton');
  }

  public prijava(uporabnik: any): Observable<RezultatAvtentikacije> {
    return this.uporabnikService.prijava(uporabnik).pipe(
      tap((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije['zeton']);
        this.shraniUporabnika(rezultatAvtentikacije['uporabnik']);
      })
    );
  }
  public registracija(uporabnik: any): Observable<RezultatAvtentikacije> {
    return this.uporabnikService.registracija(uporabnik).pipe(
      tap((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije['zeton']);
        this.shraniUporabnika(rezultatAvtentikacije['uporabnik']);
      })
    );
  }

  public jePrijavljen(): boolean {
    const zeton: string | null = this.vrniZeton();
    if (zeton) {
      const koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      return koristnaVsebina.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public vrniTipUporabnika(): any | null {
    if (this.jePrijavljen()) {
      const zeton: string | null = this.vrniZeton();
      if (zeton) {
        const { tip } = JSON.parse(
          this.b64Utf8(zeton.split('.')[1])
        );
        return { tip } as any;
      }
    }
    return null;
  }
  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(niz), (znak: string) => {
          return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }
}
