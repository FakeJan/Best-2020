import {Component, OnInit} from '@angular/core';
import {StreznikPodatkiService} from "./storitve/streznik-podatki.service";
import {Napoved} from "./razredi/napovedi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stockbotics';
  odgovor: string;
  napovedi: Napoved[];

  constructor(private streznikPodatki: StreznikPodatkiService) {
  }

  public helloWorld(): void {
      this.streznikPodatki
        .helloWorld()
        .then(odgovor => this.odgovor = odgovor["odgovor"]);
  }

  public getNapovedi(): void {
    this.streznikPodatki
      .vrniNapovedi()
      .then(napovedi => {
        console.log(typeof napovedi);
        console.log(napovedi);
        this.napovedi = napovedi;
      });
  }

  ngOnInit(): void {
    this.helloWorld();
  }
}
