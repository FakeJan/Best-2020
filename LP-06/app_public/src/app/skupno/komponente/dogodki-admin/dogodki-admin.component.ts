import { Component, OnInit } from '@angular/core';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';

@Component({
  selector: 'app-dogodki-admin',
  templateUrl: './dogodki-admin.component.html',
  styleUrls: ['./dogodki-admin.component.css']
})
export class DogodkiAdminComponent implements OnInit {

  dogodki?: Dogodek[];

  pageSize : number = 10;
  totalEvents : number = 0;
  
  constructor(private dogodkiService: DogodkiService) { }

  ngOnInit(): void {
    this.getDogodki();
  }

  getDogodki(): void {
    let params: any = {};

    params[`page`] = 0;

    params[`size`] = this.pageSize ? this.pageSize : 10;

    this.dogodkiService
      .getDogodki(params)
      .subscribe((dogodki: any) => 
      ((this.dogodki = dogodki.events),
      (this.totalEvents = dogodki.totalEvents))
      );
  }

}
