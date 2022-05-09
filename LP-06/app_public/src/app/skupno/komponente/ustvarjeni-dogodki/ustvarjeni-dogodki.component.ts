import { Component, OnInit } from '@angular/core';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';

@Component({
  selector: 'app-ustvarjeni-dogodki',
  templateUrl: './ustvarjeni-dogodki.component.html',
  styleUrls: ['./ustvarjeni-dogodki.component.css']
})
export class UstvarjeniDogodkiComponent implements OnInit {

  dogodki?: Dogodek[];

  pageSize: number = 10;
  totalEvents: number = 0;

  constructor(
    private dogodkiService: DogodkiService
  ) { }


  ngOnInit(): void {
    this.getUstvarjeniDogodki();
  }

  private getUstvarjeniDogodki(): void {
    let params: any = {};

    params[`page`] = 0;
    params[`size`] = this.pageSize ? this.pageSize : 10;

    this.dogodkiService
      .getUstvarjeniDogodki(params)
      .subscribe((dogodki: any) =>
      ((this.dogodki = dogodki.events),
        (this.totalEvents = dogodki.totalEvents)));
  }



}
