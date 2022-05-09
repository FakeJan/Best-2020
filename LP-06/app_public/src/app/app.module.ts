import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';
import { SeznamDogodkovComponent } from './skupno/komponente/seznam-dogodkov/seznam-dogodkov.component';
import { OgrodjeComponent } from './skupno/komponente/ogrodje/ogrodje.component';
import { VsiDogodkiComponent } from './skupno/komponente/vsi-dogodki/vsi-dogodki.component';
import { PridruzeniDogodkiComponent } from './skupno/komponente/pridruzeni-dogodki/pridruzeni-dogodki.component';
import { DateFormatePipe } from './skupno/cevi/date-formate.pipe';
import { HomepageComponent } from './skupno/komponente/homepage/homepage.component';
import { MainNavbarComponent } from './skupno/komponente/main-navbar/main-navbar.component';
import { HomeNavbarComponent } from './skupno/komponente/home-navbar/home-navbar.component';
import { KlepetComponent } from './skupno/komponente/klepet/klepet.component';
import { UstvarjeniDogodkiComponent } from './skupno/komponente/ustvarjeni-dogodki/ustvarjeni-dogodki.component';
import { DogodkiSidenavComponent } from './skupno/komponente/dogodki-sidenav/dogodki-sidenav.component';
import { DogodekPodrobnostiComponent } from './skupno/komponente/dogodek-podrobnosti/dogodek-podrobnosti.component';
import { DogodekUstvariComponent } from './skupno/komponente/dogodek-ustvari/dogodek-ustvari.component';
import { DogodekUrediComponent } from './skupno/komponente/dogodek-uredi/dogodek-uredi.component';
import { IzbiraSlikeComponent } from './skupno/komponente/izbira-slike/izbira-slike.component';
import { AutocompleteComponent } from './skupno/komponente/autocomplete/autocomplete.component';
import { LoginComponent } from './skupno/komponente/login/login.component';
import { SignupComponent } from './skupno/komponente/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountSettingsComponent } from './skupno/komponente/account-settings/account-settings.component';
import { IzbiraAvatarComponent } from './skupno/komponente/izbira-avatar/izbira-avatar.component';
import { DogodkiAdminComponent } from './skupno/komponente/dogodki-admin/dogodki-admin.component';
import { AdminMainNavbarComponent } from './skupno/komponente/admin-main-navbar/admin-main-navbar.component';
import { UporabnikiAdminComponent } from './skupno/komponente/uporabniki-admin/uporabniki-admin.component';
import { DbComponent } from './skupno/komponente/db/db.component';
import { PathSlikeIzIndeksaPipe } from './skupno/cevi/path-slike-iz-indeksa.pipe';
import { FormatirajPreostaliCasPipe } from './skupno/cevi/formatiraj-preostali-cas.pipe';
import { ArrayIncludesPipe } from './skupno/cevi/array-includes.pipe';
import { IzbranKlepetComponent } from './skupno/komponente/izbran-klepet/izbran-klepet.component';
import { PretekliCasPipe } from './skupno/cevi/pretekli-cas.pipe';
import { DogodkiGostComponent } from './skupno/komponente/dogodki-gost/dogodki-gost.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SeznamDogodkovComponent,
    OgrodjeComponent,
    VsiDogodkiComponent,
    PridruzeniDogodkiComponent,
    DateFormatePipe,
    HomepageComponent,
    MainNavbarComponent,
    HomeNavbarComponent,
    KlepetComponent,
    UstvarjeniDogodkiComponent,
    DogodkiSidenavComponent,
    DogodekPodrobnostiComponent,
    DogodekUstvariComponent,
    DogodekUrediComponent,
    IzbiraSlikeComponent,
    AutocompleteComponent,
    LoginComponent,
    SignupComponent,
    AccountSettingsComponent,
    IzbiraAvatarComponent,
    DogodkiAdminComponent,
    AdminMainNavbarComponent,
    UporabnikiAdminComponent,
    DbComponent,
    PathSlikeIzIndeksaPipe,
    FormatirajPreostaliCasPipe,
    ArrayIncludesPipe,
    IzbranKlepetComponent,
    PretekliCasPipe,
    DogodkiGostComponent
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    HttpClientModule,
    AppUsmerjanjeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'sl-SL' }
  ],
  bootstrap: [OgrodjeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
