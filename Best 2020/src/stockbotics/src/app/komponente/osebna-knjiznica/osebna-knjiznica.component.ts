import {Component, OnInit} from '@angular/core';
import {Bot} from "../../razredi/bot";
import {Uporabnik} from "../../razredi/uporabnik";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Title} from "@angular/platform-browser";
import {switchMap} from "rxjs/operators";
import { NotifierService } from "angular-notifier";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-osebna-knjiznica',
  templateUrl: './osebna-knjiznica.component.html',
  styleUrls: ['./osebna-knjiznica.component.css']
})
export class OsebnaKnjiznicaComponent implements OnInit {
  boti: Bot[];
  osebnaKnjiznica: Bot[] = [];
  public uporabnik: Uporabnik;
  private parameter: string;

  constructor(private avtentikacijaService: AvtentikacijaService,
              private pot: ActivatedRoute,
              private router: Router,
              private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute,
              private title: Title,
              private notifier: NotifierService) {
    title.setTitle("Osebna knjiznica");
  }

  public getVsiBoti(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.streznikPodatki.vrniVseBote();
        })
      ).subscribe(najdeniBoti => {
      this.boti = najdeniBoti;
    })
  }

  public vrniUporabnika() {
    this.uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
  }

  public pridobiOsebnoKnjiznico() {
    this.osebnaKnjiznica = [];
    for (let i = 0; i < this.boti.length; i++) {
      //console.log(this.uporabnik.seznamBotov);
      //console.log("trenutni bot" + this.boti[i]._id);
      if (this.uporabnik.seznamBotov.includes(this.boti[i]._id)) {
        console.log("osebna kniznica " + this.osebnaKnjiznica);
        console.log("pushaj bota " + this.boti[i]);
        this.osebnaKnjiznica.push(this.boti[i]);
      }
    }
  }

  public izbrisiBota(bot: Bot) {
    let index: number = this.uporabnik.seznamBotov.indexOf(bot._id);
    this.uporabnik.seznamBotov.splice(index, 1);
    console.log("izbris bota iz seznama" + this.uporabnik.seznamBotov);
    this.streznikPodatki.izbrisiBotaKnjiznice(this.uporabnik._id, this.uporabnik);
    let index2 = this.osebnaKnjiznica.indexOf(bot);
    this.osebnaKnjiznica.splice(index2, 1);
  }

  private zazeniBota(bot: Bot) {
    this.streznikPodatki.zacniTrgovanje(bot, this.parameter)
      .then(odgovor => {
        console.log(odgovor);
        this.osveziStran();
        this.notifier.notify("default", "Bot "+ bot.ime +" zagnan");
      })
  }

  private ustaviBota(bot: Bot) {
    this.streznikPodatki.ustaviTrgovanje(bot)
      .then(odgovor => {
        console.log(odgovor);
        this.osveziStran();
        this.notifier.notify("default", "Bot "+ bot.ime +" zaustavljen");
      })
  }

  private osveziStran() {
    this.router.navigate(['/zbirka'], );
    this.ngOnInit();
  }

  ngOnInit() {
    this.getVsiBoti();

    this.vrniUporabnika();
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil " + id);
          return this.streznikPodatki.pridobiUporabnika(this.uporabnik._id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
        this.uporabnik = uporabnik;
        this.pridobiOsebnoKnjiznico();
      });
  }

}
