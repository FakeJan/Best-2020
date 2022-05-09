import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { VsiDogodkiComponent } from '../../skupno/komponente/vsi-dogodki/vsi-dogodki.component';
import { PridruzeniDogodkiComponent } from '../../skupno/komponente/pridruzeni-dogodki/pridruzeni-dogodki.component';
import { HomepageComponent } from 'src/app/skupno/komponente/homepage/homepage.component';
import { KlepetComponent } from 'src/app/skupno/komponente/klepet/klepet.component';
import { UstvarjeniDogodkiComponent } from 'src/app/skupno/komponente/ustvarjeni-dogodki/ustvarjeni-dogodki.component';
import { DogodekUstvariComponent } from 'src/app/skupno/komponente/dogodek-ustvari/dogodek-ustvari.component';
import { DogodekUrediComponent } from 'src/app/skupno/komponente/dogodek-uredi/dogodek-uredi.component';
import { LoginComponent } from 'src/app/skupno/komponente/login/login.component';
import { SignupComponent } from 'src/app/skupno/komponente/signup/signup.component';
import { AccountSettingsComponent } from 'src/app/skupno/komponente/account-settings/account-settings.component';
import { DogodkiAdminComponent } from 'src/app/skupno/komponente/dogodki-admin/dogodki-admin.component';
import { UporabnikiAdminComponent } from 'src/app/skupno/komponente/uporabniki-admin/uporabniki-admin.component';
import { DbComponent } from 'src/app/skupno/komponente/db/db.component';
import { DogodkiGostComponent } from 'src/app/skupno/komponente/dogodki-gost/dogodki-gost.component';
import { AuthGuard } from 'src/app/skupno/guard/auth.guard';

const poti: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'dogodki_gost', component: DogodkiGostComponent },
  { path: 'dogodki', component: VsiDogodkiComponent,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'pridruzeni_dogodki', component: PridruzeniDogodkiComponent,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'ustvari_dogodek', component: DogodekUstvariComponent ,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'uredi_dogodek/:idDogodka', component: DogodekUrediComponent ,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'ustvarjeni_dogodki', component: UstvarjeniDogodkiComponent ,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'klepet', component: KlepetComponent ,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'klepet/:idDogodka', component: KlepetComponent ,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account_settings', component: AccountSettingsComponent ,canActivate: [AuthGuard],
  data: {
    role: 'navaden'
  }},
  { path: 'dogodki_admin', component: DogodkiAdminComponent ,canActivate: [AuthGuard],
  data: {
    role: 'admin'
  }},
  { path: 'uporabniki_admin', component: UporabnikiAdminComponent ,canActivate: [AuthGuard],
  data: {
    role: 'admin'
  }},
  { path: 'db', component: DbComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule],
})
export class AppUsmerjanjeModule { }
