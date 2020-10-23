import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'req'
})
export class ReqPipe implements PipeTransform {

  transform(value: any, division: any): any {
    return ( (value / division as number) * 100 ).toFixed(2);
  }

}
