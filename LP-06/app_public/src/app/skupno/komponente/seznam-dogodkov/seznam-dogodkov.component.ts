import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { DogodkiService } from '../../storitve/dogodki.service';
import { Dogodek } from '../../razredi/dogodek';
import { createDirectiveDefinitionMap } from '@angular/compiler/src/render3/partial/directive';
import { Router } from '@angular/router';
import { UporabnikService } from '../../storitve/uporabnik.service';
import { Uporabnik } from '../../razredi/uporabnik';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-seznam-dogodkov',
  templateUrl: './seznam-dogodkov.component.html',
  styleUrls: ['./seznam-dogodkov.component.css']
})
export class SeznamDogodkovComponent implements OnInit {

  @Input() dogodki: Dogodek[] = [];
  @Input() page: string = "all";

  searchword = "";

  pageNumber = 1;
  @Input() totalEvents = 0;
  @Input() pageSize = 10;

  @Input() filters: any;
  @Input() useFilter: boolean = false;

  constructor(private router: Router,
    private dogodkiService: DogodkiService,
    private uporabnikService: UporabnikService,
    private povezavaStoritev: PovezavaService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['dogodki']) {
      this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);
    }
  }

  orderBy(event: any, dogodki: any): void {
    var property = event.target.value;
    var sortOrder = 1;
    if (property.charAt(0) === "-") {
      sortOrder = -1;
      property = property.substring(1);
    }
    if (property === "title")
      dogodki.sort((a: Dogodek, b: Dogodek) => a.title < b.title ? -1 * sortOrder : a.title > b.title ? 1 * sortOrder : 0)
    else if (property === "date")
      dogodki.sort((a: Dogodek, b: Dogodek) => a.date < b.date ? -1 * sortOrder : a.date > b.date ? 1 * sortOrder : 0)
  }

  eventButtons(user: any, dogodki: Dogodek[]) {
    if (this.page == "admin") {
      dogodki.forEach((element: Dogodek) => {
        element.buttons = "admin";
      });
    } else if (this.page == "gost") {
      dogodki.forEach((element: Dogodek) => {
        element.buttons = "gost";
      });
    }
    else {
      dogodki.forEach((element: Dogodek) => {
        element.buttons = "none";
        for (var i = 0; i < user.created.length; i++) {
          if (element._id === user.created[i])
            element.buttons = "created";
        }

        for (var i = 0; i < user.joined.length; i++) {
          if (element._id === user.joined[i])
            element.buttons = "joined";
        }
      });
    }

    // VREME API
    this.eventSetWeather(dogodki);

    this.dogodki = dogodki;
  }

  eventSetWeather(dogodki: Dogodek[]) {
    dogodki.forEach((element: Dogodek) => {
      var dateDiff = this.dateDiff(element.date);
      this.dogodkiService
        .dogodekVreme(element.coordinates)
        .subscribe((vreme: any) => (element.eventWeather = `assets/images/weather/${vreme.daily[dateDiff].weather[0].main}.png`));
    });
  }

  dateDiff(data: Date) {
    let date = new Date(data);
    let currentDate = new Date();

    let days = Math.floor((date.getTime() - currentDate.getTime()) / 1000 / 60 / 60 / 24) + 1;
    days > 7 ? days = 7 : days < 0 ? days = 0 : days = days;

    return days;
  }

  editEvent(eventId: string): void {
    this.router.navigate([`/uredi_dogodek/${eventId}`]);
  }

  loadChat(eventId: string): void {
    this.router.navigate([`/klepet/${eventId}`]);
  }

  deleteEvent(eventId: string): void {
    this.dogodkiService.deleteDogodek(eventId)
      .subscribe(() => {
        let user = this.uporabnikService.getLoggedUser();
        user.created.splice(user.created.indexOf(eventId), 1);

        this.dogodki.splice(this.dogodki.findIndex(x => x._id == eventId), 1);
        this.uporabnikService.setLoggedUser(user);
        this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);
      });
  }

  joinEvent(eventId: string): void {
    this.dogodkiService.joinDogodek(eventId)
      .subscribe((event) => {
        let user = this.uporabnikService.getLoggedUser();

        let eventIndex = this.dogodki.findIndex(x => x._id == eventId);
        this.dogodki[eventIndex] = event;

        user.joined.push(eventId);
        this.uporabnikService.setLoggedUser(user);

        this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);
      });
  }

  leaveEvent(eventId: string): void {
    this.dogodkiService.leaveDogodek(eventId)
      .subscribe((event) => {
        let user = this.uporabnikService.getLoggedUser();

        user.joined.splice(user.joined.indexOf(eventId), 1);
        this.uporabnikService.setLoggedUser(user);

        switch (this.page) {
          case 'joined':
            this.dogodki.splice(this.dogodki.findIndex(x => x._id == event._id), 1);
            break;
          default:
            let eventIndex = this.dogodki.findIndex(x => x._id == event._id);
            this.dogodki[eventIndex] = event;
            break;
        }

        this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);
      });
  }

  openNav() {
    var x: any = document.getElementById("main-sidebar-container");
    x.style.marginLeft = "0%";
  }

  handlePageChange(event: number) {
    this.pageNumber = event;
    this.retrieveEvents();
  }

  private retrieveEvents() {
    const params = this.getRequestParams(this.pageNumber, this.pageSize);

    switch (this.page) {
      case 'created':
        this.dogodkiService.getUstvarjeniDogodki(params)
          .subscribe(
            response => {
              this.dogodki = response.events;
              this.totalEvents = response.totalEvents;
              this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);

            },
            error => {
              console.log(error);
            });
        break;
      case 'joined':
        this.dogodkiService.getPridruzeniDogodki(params)
          .subscribe(
            response => {
              this.dogodki = response.events;
              this.totalEvents = response.totalEvents;
              this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);

            },
            error => {
              console.log(error);
            });
        break;
      default:
        if (this.useFilter) {
          this.filters.page = this.pageNumber - 1;
          this.filters.pageSize = this.pageSize ? this.pageSize : 10;
          this.dogodkiService.getDogodkiFiltered(this.filters)
            .subscribe(
              response => {
                this.dogodki = response.events;
                this.totalEvents = response.totalEvents;
                this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);
              },
              error => {
                console.log(error);
              });
        } else {
          this.dogodkiService.getDogodki(params)
            .subscribe(
              response => {
                this.dogodki = response.events;
                this.totalEvents = response.totalEvents;
                this.eventButtons(this.uporabnikService.getLoggedUser(), this.dogodki);
              },
              error => {
                console.log(error);
              });
        }
        break;
    }
  }

  private getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  donateEvent(eventId: string): void {
    // todo: implement
  }
}
