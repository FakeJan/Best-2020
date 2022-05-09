import { Component, OnInit } from '@angular/core';
import { DbService } from '../../storitve/db.service';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private dbStoritev: DbService) { }

  public vnesiPodatke(): void {
    this.dbStoritev.naloziPodatke()
      .subscribe(() => {
        //uspesno vneseni podatki
        (document.querySelector('#vnosPodatkovSporociloOk') as HTMLElement).style.display = "block";
        setTimeout(() => this.vnosSporociloOdstranitev(), 3000);
      })
  }

  public odstraniPodatke(): void {
    this.dbStoritev.zbrisiPodatke()
      .subscribe(() => {
        //uspesno izbrisani podatki
        (document.querySelector('#odstranitevPodatkovSporociloOk') as HTMLElement).style.display = "block";
        setTimeout(() => this.odstraniSporociloOdstranitev(), 3000);
      })
  }

  private vnosSporociloOdstranitev(): void {
    (document.querySelector('#vnosPodatkovSporociloOk') as HTMLElement).style.display = "none";
  }

  private odstraniSporociloOdstranitev(): void {
    (document.querySelector('#odstranitevPodatkovSporociloOk') as HTMLElement).style.display = "none";
  }

  ngOnInit(): void {
  }

}
