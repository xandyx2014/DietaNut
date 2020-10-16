import { Pipe, PipeTransform } from '@angular/core';
import { Compocision } from 'src/app/model/alimento.composicion.model';
type responseSummation = string | number;
@Pipe({
  name: 'subTotal'
})
export class SubTotalPipe implements PipeTransform {

  transform(value: any[], type: string, typeProperty: string): responseSummation {
    const valueByType: Compocision[] = value[type];
    if (valueByType.length) {
      let valueSummation = 0.0;
      valueByType.forEach(
        (e) => {
          valueSummation += Number(e[typeProperty]);
        }
      );
      return (valueSummation as number).toFixed(2);
    }
    return 0.0;
  }

}
