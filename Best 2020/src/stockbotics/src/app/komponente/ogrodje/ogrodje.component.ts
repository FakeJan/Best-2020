import { Component, OnInit } from '@angular/core';
import {AvtentikacijaService} from '../../storitve/avtentikacija.service';
import {Uporabnik} from '../../razredi/uporabnik';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private avtentikacijaService: AvtentikacijaService) { }

  public odjava(): void {
    this.avtentikacijaService.odjava();
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaService.jePrijavljen();
  }

  public vrniUporabnika(): string {
    const uporabnik: Uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
    return uporabnik ? uporabnik.uporabniskoIme : 'Gost';
  }

  public jeUporabnik(): boolean {
    if(!this.jePrijavljen())
      return false;
    const uporabnik: Uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
    if(uporabnik.vloga == 0)
      return true;
    else
      return false;
  }

  public jeSuperUporabnik(): boolean {
    if(!this.jePrijavljen())
      return false;
    const uporabnik: Uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
    if(uporabnik.vloga == 1)
      return true;
    else
      return false;
  }

  public jeSkrbnik(): boolean {
    if(!this.jePrijavljen())
      return false;
    const uporabnik: Uporabnik = this.avtentikacijaService.vrniTrenutnegaUporabnika();
    if(uporabnik.vloga == 2)
      return true;
    else
      return false;
  }

  ngOnInit() {
  }

}
