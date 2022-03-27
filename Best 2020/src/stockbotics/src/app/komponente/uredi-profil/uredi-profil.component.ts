import { Component, OnInit } from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Uporabnik} from "../../razredi/uporabnik";
import {switchMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-uredi-profil',
  templateUrl: './uredi-profil.component.html',
  styleUrls: ['./uredi-profil.component.css']
})
export class UrediProfilComponent implements OnInit {

  constructor(private streznikPodatkiService: StreznikPodatkiService, private pot: ActivatedRoute, private router: Router,
              private title: Title) {
    title.setTitle("Uredi profil");
  }

  public uporabnik: Uporabnik;
  public submited = false;
  public submitedGeslo = false;
  public prikaziObrazecGesla = false;
  public staroGesloOk = false;
  public jeGesloUstrezno = false;
  public uspesnoSpremenjeno = false;
  public emailJeUstrezen = false;

  public staroGeslo = '';
  public novoGeslo = '';
  public ponovljenoGeslo = '';

  public editUporabnik = {
    uporabniskoIme: '',
    email: '',
    geslo: '',
    id: ''
  };

  public validacija(): boolean {
    // ce so podatki obrazca prazni
    if (!this.emailJeUstrezen) {
      this.OnInputEmail(null);
    }
    if (this.editUporabnik.uporabniskoIme && this.editUporabnik.email && this.emailJeUstrezen) {
      return true;
    }
    this.submited = true;
    return false;
  }

  public validacijaGesla(): boolean {
    if (this.jeGesloUstrezno && this.staroGesloOk && this.preveriEnakostGesel() && this.novoGeslo != "" && this.staroGeslo != "" && this.ponovljenoGeslo != "") {
      return true;
    }
    return false;
  }

//   if (this.validacija()) {
//   this.sportyeetPodatkiService.posodobiDogodek(this.dogodek._id, this.editDogodek)
// .then((dogodek: any) => {
//   console.log('Dogodek posodobljen', dogodek);
//   this.router.navigate(['/dogodek/' + this.dogodek._id]);
// }
// );
// }
//

  public urediProfil(){
    if (this.validacija()) {
      console.log("Uredi profil ts: "+ this.editUporabnik.uporabniskoIme);
      this.uporabnik.uporabniskoIme = this.editUporabnik.uporabniskoIme;
      this.uporabnik.email = this.editUporabnik.email;
      this.streznikPodatkiService.posodobiProfil(this.uporabnik._id, this.uporabnik)
        .then((uporabnik: any) => {
            console.log('Uporabnik posodobljen', uporabnik);
            this.router.navigate(['profil']);
          }
        );
    }
  }

  public dodajSredstva():void {
    this.uporabnik.denar += 1000;
    this.streznikPodatkiService.posodobiSredstva(this.uporabnik._id, this.uporabnik)
      .then((uporabnik: any) => {
        console.log('Uporabnik posodobljen', uporabnik);
        this.router.navigate(['profil']);
      }
      );
  }

  public odpriObrazecGesla():void {
    this.prikaziObrazecGesla = true;
    this.uspesnoSpremenjeno = false;
    this.submitedGeslo = false;
    this.staroGesloOk = false;
    this.jeGesloUstrezno = false;
  }

  public zapriObrazecGeslo():void {
    this.prikaziObrazecGesla = false;
    this.submitedGeslo = false;
    this.staroGesloOk = false;
    this.jeGesloUstrezno = false;
    this.ponovljenoGeslo = '';
    this.staroGeslo = '';
    this.novoGeslo = '';
  }

  public async potrdiSprememboGesla() {
    this.submitedGeslo = true;
    console.log("nisem še preveril starega gesla: " + this.staroGesloOk);
    await this.preveriStaroGeslo();
    console.log("preveril sem staro geslo: " + this.staroGesloOk);
    if (this.validacijaGesla()) {

      console.log("validacija gesla ok!! spreminjam geslo");

      this.editUporabnik.id = this.uporabnik._id;
      this.editUporabnik.geslo = this.novoGeslo;
      await this.streznikPodatkiService
        .spremeniGesloUporabnika(this.editUporabnik)
        .then((result: boolean) => {
          console.log("result: " + result);
          this.uspesnoSpremenjeno = result;
          return result;
        });

      if (this.uspesnoSpremenjeno) {
        this.zapriObrazecGeslo();
      }
    }
  }

  public preveriEnakostGesel():boolean {
    return this.novoGeslo == this.ponovljenoGeslo;
  }

  public async preveriStaroGeslo() {
    this.editUporabnik.id = this.uporabnik._id;
    this.editUporabnik.geslo = this.staroGeslo;

    await this.streznikPodatkiService
      .preveriGesloUporabnika(this.editUporabnik)
      .then((result: boolean) => {
        console.log("result: " + result);
        this.staroGesloOk = result;
        return result;
      });
  }

  OnInputGeslo(event: any) {
    const gesloRegx = /^.{8,}$/;
    if (gesloRegx.test(this.novoGeslo)) {
      this.jeGesloUstrezno = true;
    } else {
      this.jeGesloUstrezno = false;
    }
  }

  OnInputStaroGeslo(event: any) {
    if (this.uporabnik.geslo == this.staroGeslo) {
      this.staroGesloOk = true;
    }
    else {
      this.staroGesloOk = false;
    }
  }

  OnInputEmail(event: any) {
    // tslint:disable-next-line:max-line-length
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailReg.test(this.editUporabnik.email)) {
      this.emailJeUstrezen = true;
      return true;
    }
    else {
      this.emailJeUstrezen = false;
      return false;
    }
  }

  ngOnInit() {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('idUporabnika');
          console.log("OnInit uredi profil "+ id);
          return this.streznikPodatkiService.pridobiUporabnika(id);

        }))
      .subscribe((uporabnik: Uporabnik) => {
      this.uporabnik = uporabnik;
      console.log(uporabnik);
      this.editUporabnik.uporabniskoIme = this.uporabnik.uporabniskoIme;
      this.editUporabnik.email = this.uporabnik.email;
    });
  }

}
