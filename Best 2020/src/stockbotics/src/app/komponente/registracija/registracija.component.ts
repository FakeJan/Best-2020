import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AvtentikacijaService} from '../../storitve/avtentikacija.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private avtentikacijaService: AvtentikacijaService, private router: Router, private title: Title) {
    title.setTitle("Registracija");
  }

  public novUporabnik = {
    uporabniskoIme: '',
    ocena: '0',
    denar: 0,
    vloga: 0,
    geslo: '',
    email: '',
    ime: '',
    priimek: '',
    datumPrijave: new Date()
  };

  public submited = false;
  public napaka: string;
  public ponovljenoGeslo = '';
  public niUstreznoIme = false;
  public niUstrezenPriimek = false;
  public niUstrezenEmail = false;
  public niUstreznoGeslo = false;


  private validacijaRegistracija(): boolean {
    // tslint:disable-next-line:max-line-length
    // console.log('PONOVLJENO: ' + this.ponovljenoGeslo + ' || PRVOTNO: ' + this.novUporabnik.geslo);
    // tslint:disable-next-line:max-line-length

    if (this.novUporabnik.uporabniskoIme && this.novUporabnik.geslo && this.novUporabnik.email && this.novUporabnik.ime && this.novUporabnik.priimek && this.ponovljenoGeslo === this.novUporabnik.geslo
      && !this.niUstreznoGeslo && !this.niUstreznoIme && !this.niUstrezenPriimek && !this.niUstrezenEmail) {
      return true;
    } else {
      this.submited = true;
      return false;
    }
  }
  OnInput(event: any) {
    this.ponovljenoGeslo = event.target.value;
  }
  OnInputGeslo(event: any) {
    const gesloRegx = /^.{8,}$/;
    if (!gesloRegx.test(this.novUporabnik.geslo)) {
      this.niUstreznoGeslo = true;
    } else { this.niUstreznoGeslo = false; }
  }
  OnInputEmail(event: any) {
    // tslint:disable-next-line:max-line-length
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(this.novUporabnik.email)) {
      this.niUstrezenEmail = true;
    } else { this.niUstrezenEmail = false; }
  }
  OnInputIme(event: any) {
    const validacijaIme = /^[A-Z][a-z]*$/;
    if (!validacijaIme.test(this.novUporabnik.ime)) {
      this.niUstreznoIme = true;
    } else { this.niUstreznoIme = false; }
  }
  OnInputPriimek(event: any) {
    const validacijaPriimek = /^[A-Z][a-z]*$/;
    if (!validacijaPriimek.test(this.novUporabnik.priimek)) {
      this.niUstreznoIme = true;
    } else { this.niUstreznoIme = false; }
  }

  public izvediRegistracijo() {

    if (this.validacijaRegistracija()) {
      console.log(this.novUporabnik);

      this.avtentikacijaService.registracija(this.novUporabnik).then(() => {
        this.router.navigateByUrl('/').catch(sporocilo => this.napaka = sporocilo);
      });
    }
  }

  ngOnInit() {
  }

}
