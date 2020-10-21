import { Pipe, PipeTransform } from '@angular/core';
import { Compocision } from 'src/app/model/alimento.composicion.model';
type responseSummation = string | number;
@Pipe({
  name: 'subTotal'
})
export class SubTotalPipe implements PipeTransform {

  transform(value: any[], type: string, typeProperty: string, subTotal = true): responseSummation {
    if (subTotal) {
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
    } else {
      // tslint:disable-next-line: no-string-literal
      const valueAlmuerzo = value['almuerzo'] as any[];
      // tslint:disable-next-line: no-string-literal
      const valueCena = value['cena'] as any[];
      // tslint:disable-next-line: no-string-literal
      const valueDesayuno = value['desayuno'] as any[];
      // tslint:disable-next-line: no-string-literal
      const valueMerienda = value['merienda'] as any[];
      // tslint:disable-next-line: no-string-literal
      const valueTe = value['te'] as any[];
      let valueTotal = 0.00;
      valueAlmuerzo.forEach(e => {
        valueTotal += Number(e[typeProperty]);
      });
      valueCena.forEach(e => {
        valueTotal += Number(e[typeProperty]);
      });
      valueDesayuno.forEach(e => {
        valueTotal += Number(e[typeProperty]);
      });
      valueMerienda.forEach(e => {
        valueTotal += Number(e[typeProperty]);
      });
      valueTe.forEach(e => {
        valueTotal += Number(e[typeProperty]);
      });

      return (valueTotal as number).toFixed(2);
    }

  }

}
