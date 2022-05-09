import { Component, OnInit } from '@angular/core';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';

@Component({
  selector: 'app-pridruzeni-dogodki',
  templateUrl: './pridruzeni-dogodki.component.html',
  styleUrls: ['./pridruzeni-dogodki.component.css']
})
export class PridruzeniDogodkiComponent implements OnInit {

  dogodki?: Dogodek[];

  pageSize: number = 10;
  totalEvents: number = 0;

  constructor(
    private dogodkiService: DogodkiService
  ) { }


  ngOnInit(): void {
    this.getPridruzeniDogodki();
  }

  private getPridruzeniDogodki(): void {
    let params: any = {};

    params[`page`] = 0;
    params[`size`] = this.pageSize ? this.pageSize : 10;

    this.dogodkiService
      .getPridruzeniDogodki(params)
      .subscribe((dogodki: any) =>
      ((this.dogodki = dogodki.events),
        (this.totalEvents = dogodki.totalEvents)));

  }
}
