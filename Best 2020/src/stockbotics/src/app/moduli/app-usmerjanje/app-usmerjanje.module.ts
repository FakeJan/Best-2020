import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {RegistracijaComponent} from '../../komponente/registracija/registracija.component';
import {PrijavaComponent} from "../../komponente/prijava/prijava.component";
import {OgledProfilaComponent} from "../../komponente/ogled-profila/ogled-profila.component";
import {UrediProfilComponent} from "../../komponente/uredi-profil/uredi-profil.component";
import {VsiUporabnikiComponent} from "../../komponente/vsi-uporabniki/vsi-uporabniki.component";
import {DbComponent} from "../../komponente/db/db.component";
import {DomacaStranComponent} from "../../komponente/domaca-stran/domaca-stran.component";
import {LestvicaComponent} from "../../komponente/lestvica/lestvica.component";
import {TrgovinaComponent} from "../../komponente/trgovina/trgovina.component";
import {OsebnaKnjiznicaComponent} from "../../komponente/osebna-knjiznica/osebna-knjiznica.component";

const poti: Routes = [
  {
    path: '',
    component: DomacaStranComponent
  },
  {
    path: 'registracija',
    component: RegistracijaComponent
  }, {
    path: 'prijava',
    component: PrijavaComponent
  }, {
    path: 'profil',
    component: OgledProfilaComponent
  }, {
    path: 'profil/:idUporabnika',
    component: UrediProfilComponent
  }, {
    path: 'uporabniki',
    component: VsiUporabnikiComponent
  }, {
    path: 'db',
    component: DbComponent
  }, {
    path: 'lestvica',
    component: LestvicaComponent
  }, {
    path: 'trgovina',
    component: TrgovinaComponent
  }, {
    path: 'zbirka',
    component: OsebnaKnjiznicaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})
export class AppUsmerjanjeModule {
}
