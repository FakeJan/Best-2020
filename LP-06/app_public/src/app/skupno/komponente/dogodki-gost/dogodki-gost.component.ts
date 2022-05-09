import { Component, OnInit } from '@angular/core';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';

@Component({
  selector: 'app-dogodki-gost',
  templateUrl: './dogodki-gost.component.html',
  styleUrls: ['./dogodki-gost.component.css']
})
export class DogodkiGostComponent implements OnInit {

  dogodki?: Dogodek[];
  filters = {
    startDate: "",
    endDate: "",
    lokacija: "",
    razdalja: 5,
    lng: 0,
    lat: 0,
    page: 0,
    pageSize: 10
  };
  filtered = false;
  pageSize: number = 10;
  totalEvents: number = 0;

  constructor(
    private dogodkiService: DogodkiService
  ) { }


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

  getDogodkiFiltered(): void {
    if (this.filters.startDate === "") {
      var date = new Date(2000, 0, 1);
      this.filters.startDate = date.toDateString();
    }

    if (this.filters.endDate === "") {
      var date = new Date(2030, 0, 1);
      this.filters.endDate = date.toDateString();
    }

    this.filters.page = 0;
    this.filters.pageSize = this.pageSize ? this.pageSize : 10;

    console.log(this.filters);


    if (this.filters.lokacija === "") {
      this.dogodkiService
        .getDogodkiFiltered(this.filters)
        .subscribe((dogodki: any) =>
        ((this.dogodki = dogodki.events),
        (console.log(dogodki)),
          (this.totalEvents = dogodki.totalEvents)));
    } else {
      this.dogodkiService
        .dogodekLokacija(this.filters.lokacija)
        .subscribe((data: any) => {
          this.filters.lng = data[0].lon;
          this.filters.lat = data[0].lat;
          this.dogodkiService
            .getDogodkiFiltered(this.filters)
            .subscribe((dogodki: any) =>
            ((this.dogodki = dogodki.events),
              (this.totalEvents = dogodki.totalEvents)));
        })
    }
    this.filtered = true;
  }


  closeNav() {
    var x: any = document.getElementById("main-sidebar-container");
    x.style.marginLeft = "-100%";
  }

}
