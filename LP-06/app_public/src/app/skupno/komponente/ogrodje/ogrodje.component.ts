import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private router: Router, private povezavaStoritev: PovezavaService) { }

  ngOnInit(): void {
  }

  showMainNavbar() {
    if (this.router.url == '/' || this.router.url == '/login' || this.router.url == '/signup'
      || this.router.url == '/dogodki_gost' || this.router.url == '/dogodki_admin' || this.router.url == '/uporabniki_admin' || this.router.url == '/db') {
      return false;
    }
    return true;
  }
  showAdminNavbar() {
    if (this.router.url == '/dogodki_admin' || this.router.url == '/uporabniki_admin') {
      return true;
    }
    return false;
  }

  getYear() {
    return new Date().getFullYear();
  }

  notLogOrReg() {
    if (this.router.url == '/login' || this.router.url == '/signup' || this.router.url == '/db') {
      return false;
    }
    return true;
  }
  ifHomeRoute() {
    return (this.router.url == '/');
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

}
