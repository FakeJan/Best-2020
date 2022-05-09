import { ViewportScroller } from "@angular/common";
import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router"
import { PovezavaService } from "../../storitve/povezava.service";

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor(private scroller: ViewportScroller, private router: Router, private povezavaStoritev: PovezavaService) { }

  ngOnInit(): void {
  }

  goDown() {
    this.scroller.scrollToAnchor("kategorije");
  }

  public isHomeRoute() {
    return this.router.url == '/';
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

}
