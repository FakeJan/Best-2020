import { Component, OnInit } from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private streznikPodatki: StreznikPodatkiService, private title: Title) {
    title.setTitle("Dodajanje v bazo");
  }

  ngOnInit() {
  }

  public vstaviPodatkeVBazi(): void {
    this.streznikPodatki.vstaviDb();
  }

  public izbrisiPodatkeIzBaz(): void {
    this.streznikPodatki.izbrisiDb();
  }

}
