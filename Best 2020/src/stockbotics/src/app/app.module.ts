import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {DatePipe} from "@angular/common";
import {NotifierModule} from "angular-notifier";

import { AppComponent } from './app.component';
import { RegistracijaComponent } from './komponente/registracija/registracija.component';
import {FormsModule} from "@angular/forms";
import { OgrodjeComponent } from './komponente/ogrodje/ogrodje.component';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';
import { PrijavaComponent } from './komponente/prijava/prijava.component';
import { OgledProfilaComponent } from './komponente/ogled-profila/ogled-profila.component';
import { FooterComponent } from './komponente/footer/footer.component';
import { DomacaStranComponent } from './komponente/domaca-stran/domaca-stran.component';
import { UrediProfilComponent } from './komponente/uredi-profil/uredi-profil.component';
import { PodrobnostiUporabnikaComponent } from './komponente/podrobnosti-uporabnika/podrobnosti-uporabnika.component';
import { VsiUporabnikiComponent } from './komponente/vsi-uporabniki/vsi-uporabniki.component';
import { DbComponent } from './komponente/db/db.component';
import { LestvicaComponent } from './komponente/lestvica/lestvica.component';
import { TrgovinaComponent } from './komponente/trgovina/trgovina.component';
import { OsebnaKnjiznicaComponent } from './komponente/osebna-knjiznica/osebna-knjiznica.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistracijaComponent,
    OgrodjeComponent,
    OgledProfilaComponent,
    PrijavaComponent,
    FooterComponent,
    DomacaStranComponent,
    UrediProfilComponent,
    PodrobnostiUporabnikaComponent,
    VsiUporabnikiComponent,
    DbComponent,
    LestvicaComponent,
    TrgovinaComponent,
    OsebnaKnjiznicaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppUsmerjanjeModule,
    NotifierModule.withConfig({
      theme: 'material',
      behaviour: {
        autoHide: 2000,
        stacking: false
      },
      position: {
        horizontal: {
          position: 'middle',
        },
        vertical: {
          position: "top",
        }
      }
    })
  ],
  providers: [ DatePipe ],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
