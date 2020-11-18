import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'totalDistribucion'})
export class DistribucionPipe implements PipeTransform {
    transform(value: any): any {
        const total = Number(value.almuerzo)
        + Number(value.cena)
        + Number(value.merienda)
        + Number(value.meriendaTwo);
        console.log(value.racion, total);
        console.log(Number(value.racion) > total);
        return true;
    }
}