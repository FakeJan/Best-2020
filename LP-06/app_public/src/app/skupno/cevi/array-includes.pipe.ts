import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayIncludes'
})
export class ArrayIncludesPipe implements PipeTransform {

  transform(value: string): boolean {
    var user : any = JSON.parse("" + localStorage.getItem("uporabnik"));
    return user && (user.created.includes(value) || user.joined.includes(value));
  }

}
