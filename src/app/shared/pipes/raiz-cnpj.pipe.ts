import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'raizCNPJ'
})
export class RaizCnpjPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let result: string;

    if(value?.length != 8){
      result = '';
    }else{
      result = value.substring(0,2) + '.' + value.substring(2,5) + '.' + value.substring(5,8);
    }

    return result;
  }

}
