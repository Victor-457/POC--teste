import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjFormatado'
})
export class CnpjFormatadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
  }

}
