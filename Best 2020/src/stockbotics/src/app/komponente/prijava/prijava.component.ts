import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AvtentikacijaService} from '../../storitve/avtentikacija.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private avtentikacijaService: AvtentikacijaService, private router: Router, private title: Title) {
    title.setTitle("Prijava");
  }

  public prijavljenUporabnik = {
    email: '',
    geslo: ''
  };

  public submitedPrijava = false;
  public napakaPriPrijavi = '';


  private validacijaPrijava(): boolean {
    // tslint:disable-next-line:max-line-length
    if (this.prijavljenUporabnik.geslo && this.prijavljenUporabnik.email) {
      return true;
    } else {
      this.submitedPrijava = true;
      return false;
    }
  }
  public prijaviUporabnika() {
    this.napakaPriPrijavi = '';
    if (this.validacijaPrijava()) {
      //log uporabnika
      console.log(this.prijavljenUporabnik);
      this.avtentikacijaService.prijava(this.prijavljenUporabnik).then(() => {
        //this.avtentikacijaService.posodobiDatumPrijave();
        this.router.navigateByUrl('/'); } ).catch(sporocilo => {this.napakaPriPrijavi = 'Napačno geslo!'; } );
    }
  }
  ngOnInit() {
  }

}
