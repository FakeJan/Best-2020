import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Uporabnik } from '../../razredi/uporabnik';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private uporabnikService: UporabnikService,
    private router: Router) { }

  public uporabnik: Uporabnik = new Uporabnik();
  public kopijaUporabnika: Uporabnik = new Uporabnik();

  public prvoGeslo: string = "";
  public drugoGeslo: string = "";

  public urediShraniGumb: string = "UREDI";

  public vnosOnemogocen: boolean = true;
  public spremeniGeslo: boolean = false;

  private subscription: Subscription = new Subscription();
  public odstevanjeDoPosodobitve: boolean = false;

  ngOnInit(): void {
    this.uporabnik = this.uporabnikService.getLoggedUser();
    this.kopijaUporabnika = this.uporabnikService.getLoggedUser();
  }

  public preveriIme() {
    this.imeSpremenjeno = true;
    if (this.uporabnik.ime == "") {
      this.imeUstrezno = false;
    } else {
      this.imeUstrezno = true;
    }
  }
  public preveriPriimek() {
    this.priimekSpremenjen = true;
    if (this.uporabnik.priimek == "") {
      this.priimekUstrezno = false;
    } else {
      this.priimekUstrezno = true;
    }
  }
  public preveriUporabniskoIme() {
    this.uporabniskoImeSporocilo = "Neveljavno uporabnisko ime!";
    this.uporabniskoImeSpremenjeno = true;
    if (this.uporabnik.uporabniskoIme == "") {
      this.uporabniskoImeUstrezno = false;
    } else {
      this.uporabniskoImeUstrezno = true;
    }
  }
  public preveriEmail() {
    this.emailSporocilo="Neveljaven email!";
    this.emailSpremenjen = true;
    if (!this.validateEmail(this.uporabnik.email)) {
      this.emailUstrezno = false;
    } else {
      this.emailUstrezno = true;
    }
  }
  public preveriPrvoGeslo() {
    this.prvoGesloSpremenjeno = true;
    this.drugoGesloSpremenjeno = true;
    if (this.prvoGeslo == "" || !this.validatePassword(this.prvoGeslo)) {
      this.gesloUstrezno = false;
      this.prvoGesloUstrezno = false;
      this.prvoGesloSporocilo = "Vsaj 1 velika in 1 mala črka, ter 1 številka!";
    } else {
      this.prvoGesloUstrezno = true;
    }
    if (this.drugoGesloSpremenjeno) {
      this.preveriDrugoGeslo();
    }
  }
  public preveriDrugoGeslo() {
    this.prvoGesloSpremenjeno = true;
    this.drugoGesloSpremenjeno = true;
    if (this.prvoGesloUstrezno) {
      if (this.prvoGeslo == this.drugoGeslo) {
        this.gesloUstrezno = true;
      } else {
        this.gesloUstrezno = false;
        this.drugoGesloSporocilo = "Gesli se ne ujemata!";
      }
    } else {
      this.drugoGesloSporocilo = "Prvo geslo ni pravilne oblike";
    }
  }
  public preveriSpremembnoPodatkov() {
    if (this.ustrezniVnosi()) {
      this.uporabnikService
        .preveriObstojEmail(this.uporabnik)
        .subscribe({
          next: (uporabnikEmail: any) => {
            if (!(uporabnikEmail.length == 0 || !this.emailSpremenjen || this.uporabnik._id == uporabnikEmail[0]._id)) {
              this.emailSporocilo = "Vpisan e-mail naslov že obstaja!";
              this.emailUstrezno = false;
            }
            this.uporabnikService
              .preveriObstojUporabniskoIme(this.uporabnik)
              .subscribe({
                next: (uporabnikUsername: any) => {
                  if (!(uporabnikUsername.length == 0 || !this.uporabniskoImeSpremenjeno || this.uporabnik._id == uporabnikUsername[0]._id)) {
                    this.uporabniskoImeSporocilo = "Vpisano uporabniško ime že obstaja!";
                    this.uporabniskoImeUstrezno = false;
                  }
                  if (this.uporabniskoImeUstrezno && this.emailUstrezno) {
                    this.zacniOdstavatiCas();
                  }
                },
                error: (napaka: any) => {
                  console.log(napaka);
                },
              });
          },
          error: (napaka: any) => {
            console.log(napaka);
          },
        });
    } else {
      this.ponovnoPreveriVseVnose();
    }
  }

  preostanekCasaZaUpdate: number = 8;
  zacniOdstavatiCas() {
    this.odstevanjeDoPosodobitve = true;
    this.subscription = interval(1000)
      .subscribe(x => { this.izpisujPreostanek(this.preostanekCasaZaUpdate); });
  }
  izpisujPreostanek(ms: number) {
    if (!this.odstevanjeDoPosodobitve) {
      this.subscription.unsubscribe();
    }
    this.preostanekCasaZaUpdate -= 1;
    if (this.preostanekCasaZaUpdate <= 0) {
      this.subscription.unsubscribe();
      this.posodobiUporabnika();
    }
  }

  posodobiUporabnika() {
    if (this.spremeniGeslo) {
      this.uporabnik.geslo = this.prvoGeslo;
    }
    console.log(this.uporabnikService.getLoggedUser());
    console.log(this.uporabnik);

    this.uporabnikService
      .posodobiUporabnika(this.uporabnik)
      .subscribe({
        next: (uporabnikNov: Uporabnik) => {
          console.log(uporabnikNov);
          if (uporabnikNov != null) {
            this.uporabnikService.setLoggedUser(uporabnikNov);
            location.replace("/dogodki");
          }
        },
        error: (napaka: any) => {
          console.log(napaka);
        },
      });
  }

  public urediShrani() {
    if (this.vnosOnemogocen) {
      this.urediShraniGumb = "SHRANI";
      this.vnosOnemogocen = false;
    } else {
      if (this.aliJeBilaSprememba()) {
        this.ponovnoPreveriVseVnose();
        if (this.ustrezniVnosi()) {
          this.preveriSpremembnoPodatkov();
        }
      } else {
        this.prekliciSpremembe();
      }
    }
  }
  public spremeniGesloChange() {
    this.spremeniGeslo = !this.spremeniGeslo;
    if (!this.spremeniGeslo) {
      this.poenostaviGesloInput();
    }
  }
  aliJeBilaSprememba() {
    return (this.preveriSprememboSlike() ||
      this.uporabnik.ime != this.kopijaUporabnika.ime ||
      this.uporabnik.priimek != this.kopijaUporabnika.priimek ||
      this.uporabnik.uporabniskoIme != this.kopijaUporabnika.uporabniskoIme ||
      this.uporabnik.email != this.kopijaUporabnika.email ||
      this.spremeniGeslo);
  }
  preveriSprememboSlike() {
    let image: any = document.getElementById("accountSettingsAvatar");
    var indeksTrenutnegaAvatarja = this.vrniIndeksSlike(image.src);
    if (!(indeksTrenutnegaAvatarja == this.kopijaUporabnika.slika)) {
      this.uporabnik.slika = indeksTrenutnegaAvatarja;
      return true;
    } else {
      return false;
    }
  }
  vrniIndeksSlike(path: string) {
    var niz = path.substring(path.length - 6, path.length - 4);
    if (niz.charAt(0) == 'r') {
      return parseInt(niz.substring(1, 2));
    } else {
      return parseInt(niz);
    }
  }

  ustrezniVnosi() {
    return (this.emailUstrezno && this.imeUstrezno && this.priimekUstrezno && this.uporabniskoImeUstrezno && (this.spremeniGeslo ? this.gesloUstrezno : true));
  }
  public prekliciSpremembe() {
    this.uporabnik = this.uporabnikService.getLoggedUser();
    this.poenostaviSlikoUporabnika();
    this.vnosOnemogocen = true;
    this.urediShraniGumb = "UREDI";
    this.spremeniGeslo = false;
    this.prvoGeslo = "";
    this.drugoGeslo = "";
    this.resetPogojev();
    if (this.odstevanjeDoPosodobitve) {
      this.odstevanjeDoPosodobitve = false;
      this.preostanekCasaZaUpdate = 8;
    }
  }

  ponovnoPreveriVseVnose() {
    this.preveriIme(); this.preveriPriimek(); this.preveriUporabniskoIme(); this.preveriEmail();
    if (this.spremeniGeslo) {
      this.preveriPrvoGeslo(); this.preveriDrugoGeslo();
    }
  }

  poenostaviSlikoUporabnika() {
    let image: any = document.getElementById("accountSettingsAvatar");
    image.src = "assets/images/profileAvatars/avatarOptions/profileAvatar" + this.kopijaUporabnika.slika + ".png";
  }

  public emailSporocilo: string = "Neveljaven email!"
  public prvoGesloSporocilo: string = "Neveljavno geslo!"
  public drugoGesloSporocilo: string = "Gesli se ne ujemata!"
  public uporabniskoImeSporocilo: string = "Neveljavno uporabnisko ime!"
  public emailUstrezno: boolean = true;
  public gesloUstrezno: boolean = true;
  public prvoGesloUstrezno: boolean = true;
  public imeUstrezno: boolean = true;
  public priimekUstrezno: boolean = true;
  public uporabniskoImeUstrezno: boolean = true;
  public emailSpremenjen: boolean = false;
  public prvoGesloSpremenjeno: boolean = false;
  public drugoGesloSpremenjeno: boolean = false;
  public imeSpremenjeno: boolean = false;
  public priimekSpremenjen: boolean = false;
  public uporabniskoImeSpremenjeno: boolean = false;

  resetPogojev() {
    this.emailSporocilo = "Neveljaven email!"
    this.prvoGesloSporocilo = "Neveljavno geslo!"
    this.drugoGesloSporocilo = "Gesli se ne ujemata!"
    this.uporabniskoImeSporocilo = "Neveljavno uporabnisko ime!"
    this.emailUstrezno = true;
    this.gesloUstrezno = false;
    this.prvoGesloUstrezno = false;
    this.imeUstrezno = true;
    this.priimekUstrezno = true;
    this.uporabniskoImeUstrezno = true;
    this.emailSpremenjen = false;
    this.prvoGesloSpremenjeno = false;
    this.drugoGesloSpremenjeno = false;
    this.imeSpremenjeno = false;
    this.priimekSpremenjen = false;
    this.uporabniskoImeSpremenjeno = false;
  }
  poenostaviGesloInput() {
    if(this.uporabnik.geslo){
      this.uporabnik.geslo="";
    }
    this.prvoGesloSporocilo = "";
    this.drugoGesloSporocilo = "";
    this.prvoGeslo = "";
    this.drugoGeslo = "";
    this.prvoGesloSpremenjeno = false;
    this.drugoGesloSpremenjeno = false;
    this.prvoGesloUstrezno = false;
    this.gesloUstrezno = false;
  }
  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validatePassword(password: string) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./
    return regex.test(password);
  }
}
