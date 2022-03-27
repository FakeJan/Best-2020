import { Component, OnInit } from '@angular/core';
import {Bot} from "../../razredi/bot";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {switchMap} from "rxjs/operators";
import {Uporabnik} from "../../razredi/uporabnik";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-trgovina',
  templateUrl: './trgovina.component.html',
  styleUrls: ['./trgovina.component.css']
})
export class TrgovinaComponent implements OnInit {
  boti: Bot[];
  public uporabnik : Uporabnik;
  public premaloSredstev : boolean = false;
  public uspesenNakup: boolean = false;
  public limitBotovDosezen: boolean = false;

  constructor(private avtentikacijaService: AvtentikacijaService,
              private pot: ActivatedRoute,
              private router: Router,
              private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle("Trgovina");
  }

  public getVsiBoti(): void {
    this.route.paramMap
      .pipe(
        switchMap((params:ParamMap) => {
          return this.streznikPodatki.vrniVseBote();
        })
      ).subscribe(najdeniBoti => {
          this.boti = najdeniBoti;
    })
  }

  public vrniUporabnika() {
    this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
  }

  public filtrirajTrgovino() {
    for(let i=0; i<this.boti.length; i++){
      if(this.uporabnik.seznamBotov.includes(this.boti[i]._id)) {
        this.boti.splice(i, 1);
        i -= 1;
      }
    }
  }

  public kupiBota(bot: Bot, uporabnik: Uporabnik) {
    var novoStanje : number = uporabnik.denar - bot.cena;
    if (this.uporabnik.vloga == 0 && this.uporabnik.seznamBotov.length == 3) {
      console.log("Navadni uporabnik lahko kupi največ 3 bote.");
      this.limitBotovDosezen = true;
    }
    else if (this.uporabnik.vloga == 1 && this.uporabnik.seznamBotov.length == 10) {
      console.log("Super uporabnik lahko kupi največ 10 botov.");
      this.limitBotovDosezen = true;
    }
    else if(novoStanje < 0) {
      console.log("Premalo denarja na računu.");
      this.premaloSredstev = true;
    }
    else {
      this.uporabnik.denar = novoStanje;
      this.uporabnik.seznamBotov.push(bot._id);
      this.streznikPodatki.kupiBota(uporabnik._id, this.uporabnik);
      this.uspesenNakup = true;
    }
  }

  public resetPremaloSredstev(bot : Bot) {
    this.premaloSredstev = false;
    this.limitBotovDosezen = false;
    if(this.uspesenNakup) {
      let indexKupljenegaBota : number = this.boti.indexOf(bot);
      this.boti.splice(indexKupljenegaBota, 1);
      this.uspesenNakup = false;
    }
  }

  ngOnInit() {
    this.getVsiBoti();

    this.vrniUporabnika();
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil "+ id);
          return this.streznikPodatki.pridobiUporabnika(this.uporabnik._id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
        this.filtrirajTrgovino();
      });
  }

}
