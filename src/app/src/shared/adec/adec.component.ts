import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-adec',
  templateUrl: './adec.component.html',
  styleUrls: ['./adec.component.scss'],
})
export class AdecComponent implements OnInit {
  @Input() value;
  constructor() { }

  ngOnInit() {
  }
  getTotal(value, typeProperty) {
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
