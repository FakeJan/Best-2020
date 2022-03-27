import {Component, Inject, OnInit} from '@angular/core';
import {Uporabnik} from '../../razredi/uporabnik';
import {AvtentikacijaService} from '../../storitve/avtentikacija.service';
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {SHRAMBA_BRSKALNIKA} from "../../razredi/shramba";


@Component({
  selector: 'app-ogled-profila',
  templateUrl: './ogled-profila.component.html',
  styleUrls: ['./ogled-profila.component.css']
})
export class OgledProfilaComponent implements OnInit {

  public uporabnik : Uporabnik;
  public premaloSredstev : boolean = false;

  constructor(private avtentikacijaService: AvtentikacijaService, private pot: ActivatedRoute, private router: Router,
              private streznikPodatkiStoritev: StreznikPodatkiService, private title: Title) {
    title.setTitle("Ogled profila");
  }

  public vrniUporabnika() {

    this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();

    console.log(this.uporabnik._id);
    console.log(this.uporabnik.uporabniskoIme);

    // return uporabnik ? uporabnik.username : 'Gost';
  }

  public postaniSuperUporabnik() {
    if(this.uporabnik.denar < 5000) {
      this.premaloSredstev = true;
    }
    else {
        this.uporabnik.vloga = 1;
        this.streznikPodatkiStoritev.posodobiVlogo(this.uporabnik._id, this.uporabnik);
    }
  }

  public resetPremaloSredstev() {
    this.premaloSredstev = false;
  }

  ngOnInit() {
    console.log("Vrni uporabnika za ogled profila");
    this.vrniUporabnika();
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil "+ id);
          return this.streznikPodatkiStoritev.pridobiUporabnika(this.uporabnik._id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
        console.log(uporabnik);
      });
  }

}
