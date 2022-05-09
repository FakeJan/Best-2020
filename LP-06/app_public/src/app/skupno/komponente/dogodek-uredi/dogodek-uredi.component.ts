import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';

@Component({
  selector: 'app-dogodek-uredi',
  templateUrl: './dogodek-uredi.component.html',
  styleUrls: ['./dogodek-uredi.component.css']
})
export class DogodekUrediComponent implements OnInit {


  dogodek: Dogodek = new Dogodek();

  constructor(private pot: ActivatedRoute, private dogodkiService: DogodkiService) { }

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((parametri: ParamMap) => {
          let idDogodka: string = (parametri.get('idDogodka') || '').toString();
          return this.dogodkiService.getDogodek(
            idDogodka
          );
        })
      )
      .subscribe((dogodek: Dogodek) => {
        (this.dogodek = dogodek);
      });
  }

}
