import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private uporabnikService: UporabnikService,
    private router: Router,
    private avtentikacijaStoritev: AvtentikacijaService, private povezavaStoritev: PovezavaService) { }

  public prijava = {
    email: "",
    geslo: ""
  };

  public emailSporocilo: string= "Neveljaven email!"
  public gesloSporocilo: string= "Neveljavno geslo!"

  public emailUstrezno: boolean = false;
  public gesloUstrezno: boolean = false;
  public emailSpremenjen: boolean = false;
  public gesloSpremenjeno: boolean = false;

  public zapomniSe: boolean=true;
  public autocompleteOption:string = "on";

  ngOnInit(): void {

  }
  public preveriPrijavo(): void {
    if (this.emailUstrezno && this.gesloUstrezno) {
      this.izvediPrijavo();
    }if (!this.emailSpremenjen && !this.gesloSpremenjeno){
      this.preveriEmail();
      this.preveriGeslo();
    }
  }

  private izvediPrijavo(): void {
    this.avtentikacijaStoritev
      .prijava(this.prijava)
      .subscribe({
        next: (uporabnik: any) => {
          if(uporabnik && uporabnik.uporabnik && uporabnik.uporabnik.tip =="navaden"){
            this.router.navigate(["/dogodki"]);
          }else{
            this.router.navigate(["/dogodki_admin"]);
          }
        },
        error: (napaka: any) => {
          console.log(napaka);
          if(napaka && napaka.includes("email")){
            this.emailSporocilo =napaka;
            this.emailUstrezno = false;
          }else{
            this.gesloUstrezno=false;
            this.gesloSporocilo = napaka;
          }
        },
      });
  }

  public preveriEmail() {
    this.emailSporocilo= "Neveljaven email!"
    this.emailSpremenjen = true;
    if (!this.validateEmail(this.prijava.email)) {
      this.emailUstrezno = false;
    } else {
      this.emailUstrezno = true;
    }
  }

  public preveriGeslo() {
    this.gesloSporocilo= "Neveljavno geslo!"
    this.gesloSpremenjeno = true;
    if (this.validatePassword(this.prijava.geslo)) {
      this.gesloUstrezno = true;
    } else {
      this.gesloUstrezno = false;
    }
  }

  public changeAutocomplete(){
    this.zapomniSe= !this.zapomniSe;
    if(this.zapomniSe){
      this.autocompleteOption="on";
    }else{
      this.autocompleteOption="off";
    }
  }

  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validatePassword(password : string) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./
    return regex.test(password);
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

}
