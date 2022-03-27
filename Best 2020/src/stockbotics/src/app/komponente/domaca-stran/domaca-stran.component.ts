import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Podjetje} from "../../razredi/podjetje";
import {ZgodovinskiPodatek} from "../../razredi/zgodovinskiPodatek";
import {Data} from "@angular/router";
import {Chart} from "chart.js";

@Component({
  selector: 'app-domaca-stran',
  templateUrl: './domaca-stran.component.html',
  styleUrls: ['./domaca-stran.component.css']
})
export class DomacaStranComponent implements OnInit {

  private seznamPodjetij: Array<Podjetje>;
  private trenutnoPodjetjeDelnice: Array<ZgodovinskiPodatek>;
  private trenutnoPodjetjeIme: string;
  private trenutnoPodjetjeSimbol: string;

  private imaTrenutnoPodjetjePodatkeODelnicah = false;
  private data: Data[];
  private adjustedArray;
  private datumArray;
  private linechart = null;

  constructor(private title: Title,
              private streznikService: StreznikPodatkiService,
              private datePipe: DatePipe) {
    title.setTitle("Stockbotics");
  }

  private prikaziDomacoStran(): void {
    this.streznikService.prikaziDomacoStran()
      .then(odgovor => {
        this.seznamPodjetij = odgovor;
      });
  }

  private pridobiZgodovinskePodatkePodjetja(podjetje: Podjetje): void {
    this.streznikService.prikaziZgodovinskePodatke(podjetje.simbol)
      .then(odgovor => {
        this.trenutnoPodjetjeDelnice = odgovor;
        this.trenutnoPodjetjeIme = podjetje.ime;
        this.trenutnoPodjetjeSimbol = podjetje.simbol;
        console.log("trenutna delnica:");
        console.log(this.trenutnoPodjetjeDelnice);
        this.nastaviGraf();
      });
  }

  public nastaviGraf() {
    if (this.trenutnoPodjetjeDelnice != null && Array.isArray(this.trenutnoPodjetjeDelnice) && this.trenutnoPodjetjeDelnice.length > 0) {

      this.adjustedArray = [];
      this.datumArray = [];

      this.trenutnoPodjetjeDelnice.forEach(a => {
        this.adjustedArray.push(a.adjusted);
        this.datumArray.push(a.datum);
      });

      console.log(this.adjustedArray);
      console.log(this.datumArray);

      this.linechart = new Chart('canvasDiv', {
        type: 'line',
        data: {
          labels: this.datumArray,
          datasets: [
            {
              data: this.adjustedArray,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });

    }
    else {
      this.adjustedArray = [];
      this.datumArray = [];

      this.linechart = new Chart('canvasDiv', {
        type: 'line',
        data: {
          labels: this.datumArray,
          datasets: [
            {
              data: this.adjustedArray,
              borderColor: '#3cb371',
              backgroundColor: "#0000FF",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    }
  }

  ngOnInit() {
    this.prikaziDomacoStran();
  }

}
