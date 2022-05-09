import { Component, OnInit } from '@angular/core';
import { Uporabnik } from '../../razredi/uporabnik';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-admin-main-navbar',
  templateUrl: './admin-main-navbar.component.html',
  styleUrls: ['./admin-main-navbar.component.css']
})
export class AdminMainNavbarComponent implements OnInit {

  constructor(private uporabnikService: UporabnikService,
    private avtentikacijaStoritev: AvtentikacijaService, private povezavaStoritev: PovezavaService) { }

  loggedUser: Uporabnik = new Uporabnik();

  ngOnInit(): void {
    this.loggedUser = this.uporabnikService.getLoggedUser();
  }

  public izpisUporabnika() {
    this.avtentikacijaStoritev.odjava();
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
}
