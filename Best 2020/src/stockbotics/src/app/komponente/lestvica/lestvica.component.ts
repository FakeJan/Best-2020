import { Component, OnInit } from '@angular/core';
import {Uporabnik} from "../../razredi/uporabnik";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-lestvica',
  templateUrl: './lestvica.component.html',
  styleUrls: ['./lestvica.component.css']
})
export class LestvicaComponent implements OnInit {
  uporabniki: Uporabnik[];
  uporabnikiSorted : Uporabnik[];

  constructor(private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle("Lestvica");
  }

  public getVsiUporabniki(): void {
    this.route.paramMap
      .pipe(
        switchMap((params:ParamMap) => {
          return this.streznikPodatki.vrniVseUporabnike();
        })
      ).subscribe(najdeniUporabniki => {
        this.uporabnikiSorted = najdeniUporabniki;
        this.uporabnikiSorted = this.uporabnikiSorted.slice(0);
        this.uporabnikiSorted.sort((leftSide, rightSide): number => {
          if(leftSide.ocena < rightSide.ocena) return 1;
          if(leftSide.ocena > rightSide.ocena) return -1;
          return 0;
        });
        this.uporabniki = this.uporabnikiSorted;
    })
  }

  ngOnInit() {
    this.getVsiUporabniki();
  }

}
