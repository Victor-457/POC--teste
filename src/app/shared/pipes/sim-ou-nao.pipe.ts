import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simOuNao',
  pure: false
})
export class SimOuNaoPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let result: string = '';

    if(value == 'S') {
      result = 'Sim';
    } else {
      result = 'Não';
    }

    return result;
  }

}
