import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Dogodek } from '../../razredi/dogodek';
import { DogodkiService } from '../../storitve/dogodki.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    datasets: []
  }

  // events
  constructor(private dogodkiService: DogodkiService) { }

  ngOnInit(): void {
    this.getDogodki();
  }
  getDogodki(): void {
    let params: any = {};

    params[`page`] = 0;

    params[`size`] = 100;

    this.dogodkiService
      .getDogodki(params)
      .subscribe((dogodki: any) =>
      ((this.dogodki = dogodki.events),
        (this.totalEvents = dogodki.totalEvents), (this.nastaviPodatkeGraf())),
      );
  }
  dogodki?: Dogodek[];
  totalEvents: number = 0;

  nastaviPodatkeGraf() {
    var zasedeni = 0;
    var prosti = 0;
    var neomejeno = 0;
    if (!this.dogodki) return;

    for (let i = 0; i < this.dogodki.length; i++) {
      if (this.dogodki[i].participantMax == 0) {
        neomejeno++;
      } else if (this.dogodki[i].participantMax == this.dogodki[i].users.length) {
        zasedeni++;
      } else {
        prosti++;
      }
    }
    //50 je duplikatov enega dogodka za paging
    var data = [zasedeni, prosti - 50, neomejeno];

    // this.barChartData={
    //   labels: ['Zasedeni', 'Prosti', 'Neomejeno'],
    //   datasets: [
    //     { data: data, backgroundColor: ["lightskyblue", "palegreen", "salmon"] },
    //   ]
    // };
    this.barChartData = {
      labels: ['Zasedeni', 'Prosti', 'Neomejeno'],
      datasets: [{
        label: 'Aktualni dogodki',
        data: data,
        hoverBackgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }]
    };
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
