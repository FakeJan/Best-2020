import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Pipe, PipeTransform } from '@angular/core';
import { min } from 'rxjs/operators';

@Pipe({
  name: 'pretekliCas'
})
export class PretekliCasPipe implements PipeTransform {

  transform(date: Date): string {
    var dateFormat = new Date(date);
    var todaysDate = new Date();

    var minute: any = (dateFormat.getMinutes() < 10 ? '0' : '') + dateFormat.getMinutes();
    var minuteNormal: any = dateFormat.getMinutes();
    var hour = dateFormat.getHours();
    var month = dateFormat.getMonth() + 1;//months (0-11)
    var day = dateFormat.getDate();//day (1-31)
    var year = dateFormat.getFullYear();

    var formattedDate: any;

    var todayMinute: any = todaysDate.getMinutes();
    var todayUre: any = todaysDate.getHours();

    if (dateFormat.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      if (todayUre - hour >= 2 || (todayUre - hour == 1 && todayMinute >= minuteNormal)) {
        formattedDate = "aktivnost pred več kot 1h";
      } else {
        var razlika: any = todayMinute >= minuteNormal ? todayMinute - minuteNormal : 60 - minuteNormal + todayMinute;
        formattedDate = this.sklanjanje(razlika);
      }
    } else {
      formattedDate = day + "." + month + "." + year;
    }

    return formattedDate;
  }

  private sklanjanje(razlika: any): any {
    var izpis: any;
    if (razlika == 0) {
      izpis = "aktivnost pred manj kot minuto";
    } else if (razlika == 1) {
      izpis = "aktivnost pred 1 minuto";
    } else if (razlika == 2) {
      izpis = "aktivnost pred 2 minutama";
    } else {
      izpis = "aktivnost pred " + razlika + " minutami";
    }

    return izpis;
  }

}
