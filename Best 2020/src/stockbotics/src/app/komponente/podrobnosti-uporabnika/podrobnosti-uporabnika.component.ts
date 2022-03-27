import {Component, Input, OnInit} from '@angular/core';
import {Uporabnik} from "../../razredi/uporabnik";
import {StreznikPodatkiService} from "../../storitve/streznik-podatki.service";
import {VsiUporabnikiComponent} from "../vsi-uporabniki/vsi-uporabniki.component";

@Component({
  selector: 'app-podrobnosti-uporabnika',
  templateUrl: './podrobnosti-uporabnika.component.html',
  styleUrls: ['./podrobnosti-uporabnika.component.css']
})
export class PodrobnostiUporabnikaComponent implements OnInit {

  @Input() uporabnik: Uporabnik;
  datumPrijave: string;

  constructor(private streznikPodatki: StreznikPodatkiService,
              private vsiUporabniki: VsiUporabnikiComponent) { }

  public izbrisiUporabnika(): void {
    this.streznikPodatki.izbrisiUporabnika(this.uporabnik._id);
    this.vsiUporabniki.getVsiUporabniki();
  }

  ngOnInit() {
    let date = new Date(this.uporabnik.datumPrijave);
    this.datumPrijave = date.toLocaleDateString('fi-FI');
  }

}
