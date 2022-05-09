import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Uporabnik } from '../../razredi/uporabnik';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';
import { UporabnikService } from '../../storitve/uporabnik.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent implements OnInit {

  constructor(private router: Router,
    private uporabnikService: UporabnikService,
    private avtentikacijaStoritev: AvtentikacijaService, private povezavaStoritev: PovezavaService) { }

  loggedUser: Uporabnik = new Uporabnik();

  ngOnInit(): void {
    this.loggedUser = this.uporabnikService.getLoggedUser();
  }

  public isHomeRoute() {
    return this.router.url != '/';
  }

  public izpisUporabnika() {
    this.avtentikacijaStoritev.odjava();
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

}
