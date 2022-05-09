import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormate'
})
export class DateFormatePipe implements PipeTransform {

  transform(date: Date): string {
    var dateFormat = new Date(date);
    var todaysDate = new Date();

    var minute = (dateFormat.getMinutes() < 10 ? '0' : '') + dateFormat.getMinutes()
    var hour = dateFormat.getHours();
    var month = dateFormat.getMonth() + 1;//months (0-11)
    var day = dateFormat.getDate();//day (1-31)
    var year = dateFormat.getFullYear();

    var formattedDate;

    if (dateFormat.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      formattedDate = day + "." + month + "." + year + " " + hour + ":" + minute;
    } else {
      formattedDate = day + "." + month + "." + year;
    }

    return formattedDate;
  }

}
