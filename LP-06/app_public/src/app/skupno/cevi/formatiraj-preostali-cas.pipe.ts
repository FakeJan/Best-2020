import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatirajPreostaliCas'
})
export class FormatirajPreostaliCasPipe implements PipeTransform {

  transform(preostaliCas:number): string {
    var base = "do posodobitve podatkov!";
    var sekundeOblika="";
    if(preostaliCas >= 5 || preostaliCas==0){
      sekundeOblika="sekund";
    }else if(preostaliCas >= 3){
      sekundeOblika="sekunde";
    }
    else if(preostaliCas ==2){
      sekundeOblika="sekundi";
    }else{
      sekundeOblika="sekunda";
    }
    return `Še ${preostaliCas} ${sekundeOblika} ${base}`;
  }

}
