import { ConfrontoService } from 'src/app/shared/services/confronto.service';
import { Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private elementRef: ElementRef,
              private renderer2: Renderer2,
              private confrontoService: ConfrontoService) {


    let nomeDoCampo: string = this.elementRef.nativeElement.id;

    if(this.confrontoService.campoDoAgenteReguladoFoiAlterado(nomeDoCampo)){
      this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', 'orange');//#fff3cd
    }

  }

}
