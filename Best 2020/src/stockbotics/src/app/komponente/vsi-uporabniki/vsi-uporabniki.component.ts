import {Component, OnInit} from '@angular/core';
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {Uporabnik} from "../../razredi/uporabnik";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vsi-uporabniki',
  templateUrl: './vsi-uporabniki.component.html',
  styleUrls: ['./vsi-uporabniki.component.css']
})
export class VsiUporabnikiComponent implements OnInit {
  uporabniki: Uporabnik[];

  constructor(private streznikPodatki: StreznikPodatkiService,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle("Vsi uporabniki");
  }

  public getVsiUporabniki(): void {
    this.route.paramMap
      .pipe(
        switchMap((params:ParamMap) => {
          return this.streznikPodatki.vrniVseUporabnike();
        })
      ).subscribe(najdeniUporabniki => {
        this.uporabniki = najdeniUporabniki;
    })
  }

  ngOnInit() {
    this.getVsiUporabniki();
  }

}
