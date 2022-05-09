import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';
import { UporabnikService } from '../../storitve/uporabnik.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private uporabnikService: UporabnikService,
    private router: Router,
    private avtentikacijaStoritev: AvtentikacijaService,private povezavaStoritev: PovezavaService) { }

  ngOnInit(): void {
  }
  public posljiEmail: boolean = false;

  public registracija = {
    email: "",
    prvoGeslo: "",
    drugoGeslo: "",
    uporabniskoIme: "",
    ime: "",
    priimek: ""
  };

  public preveriEmail() {
    this.emailSpremenjen = true;
    if (!this.validateEmail(this.registracija.email)) {
      this.emailUstrezno = false;
    } else {
      this.emailUstrezno = true;
    }
  }
  public preveriIme() {
    this.imeSpremenjeno = true;
    if (this.registracija.ime == "") {
      this.imeUstrezno = false;
    } else {
      this.imeUstrezno = true;
    }
  }
  public preveriPriimek() {
    this.priimekSpremenjen = true;
    if (this.registracija.priimek == "") {
      this.priimekUstrezno = false;
    } else {
      this.priimekUstrezno = true;
    }
  }
  public preveriUporabniskoIme() {
    this.uporabniskoImeSpremenjeno = true;
    if (this.registracija.uporabniskoIme == "") {
      this.uporabniskoImeUstrezno = false;
    } else {
      this.uporabniskoImeUstrezno = true;
    }
  }
  public preveriPrvoGeslo() {
    this.prvoGesloSpremenjeno = true;
    if (this.registracija.prvoGeslo == "" || !this.validatePassword(this.registracija.prvoGeslo)) {
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
    this.drugoGesloSpremenjeno = true;
    if (this.prvoGesloUstrezno) {
      if (this.registracija.prvoGeslo == this.registracija.drugoGeslo) {
        this.gesloUstrezno = true;
      } else {
        this.gesloUstrezno = false;
        this.drugoGesloSporocilo = "Gesli se ne ujemata!";
      }
    } else {
      this.drugoGesloSporocilo = "Prvo geslo ni pravilne oblike";
    }
  }

  ustrezniVnosi() {
    return (this.emailUstrezno && this.imeUstrezno && this.priimekUstrezno && this.uporabniskoImeUstrezno && this.gesloUstrezno);
  }
  ponovnoPreveriVseVnose() {
    this.preveriIme();
    this.preveriPriimek();
    this.preveriUporabniskoIme();
    this.preveriEmail();
    this.preveriPrvoGeslo();
    this.preveriDrugoGeslo();
  }

  izvediRegistracijo(){
    this.avtentikacijaStoritev
      .registracija(this.registracija)
      .subscribe({
        next: (uporabnik: any) => {
          this.router.navigate(["/dogodki"]);
          if(this.posljiEmail){
            this.posliEmail();
          }
        },
        error: (napaka: any) => {
          console.log(napaka);
          this.drugoGesloSporocilo = napaka;
        },
      });
  }

  public preveriRegistracijo() {
    if (this.ustrezniVnosi()) {
      this.uporabnikService
        .preveriObstojEmail(this.registracija)
        .subscribe({
          next: (uporabnik: any) => {
            if (uporabnik.length > 0) {
              this.emailSporocilo = "Vpisan e-mail naslov že obstaja!";
              this.emailUstrezno = false;
            }
            this.uporabnikService
              .preveriObstojUporabniskoIme(this.registracija)
              .subscribe({
                next: (uporabnik: any) => {
                  if (uporabnik.length > 0) {
                    this.uporabniskoImeSporocilo = "Vpisano uporabniško ime že obstaja!";
                    this.uporabniskoImeUstrezno = false;
                  }
                  if (this.uporabniskoImeUstrezno && this.emailUstrezno) {
                    this.izvediRegistracijo();
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

  posliEmail() {
    this.uporabnikService
      .posliEmail(this.registracija)
      .subscribe({
        error: (napaka: any) => {
          console.log(napaka);
        },
      });
  }

  //groza
  public emailSporocilo: string = "Neveljaven email!"
  public prvoGesloSporocilo: string = "Neveljavno geslo!"
  public drugoGesloSporocilo: string = "Gesli se ne ujemata!"
  public uporabniskoImeSporocilo: string = "Neveljavno uporabnisko ime!"
  public emailUstrezno: boolean = false;
  public gesloUstrezno: boolean = false;
  public prvoGesloUstrezno: boolean = false;
  public imeUstrezno: boolean = false;
  public priimekUstrezno: boolean = false;
  public uporabniskoImeUstrezno: boolean = false;
  public emailSpremenjen: boolean = false;
  public prvoGesloSpremenjeno: boolean = false;
  public drugoGesloSpremenjeno: boolean = false;
  public imeSpremenjeno: boolean = false;
  public priimekSpremenjen: boolean = false;
  public uporabniskoImeSpremenjeno: boolean = false;

  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validatePassword(password: string) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./
    return regex.test(password);
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

}
