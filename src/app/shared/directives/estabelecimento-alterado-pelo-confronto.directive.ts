import { Estabelecimento } from './../models/estabelecimento';
import { PessoaJuridicaLocalStorageService } from './../services/pessoa-juridica-local-storage.service';
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ConfrontoService } from '../services/confronto.service';

@Directive({
  selector: '[estabelecimentoAlteradoPeloConfronto]'
})
export class EstabelecimentoAlteradoPeloConfrontoDirective {

  constructor(private elementRef: ElementRef,
              private renderer2: Renderer2,
              private confrontoService: ConfrontoService,
              private pessoaJuridicaLocalStorageService: PessoaJuridicaLocalStorageService) {


    let nomeDoCampo: string = this.elementRef.nativeElement.id;

    let estabelecimentoSelecionado: Estabelecimento = this.pessoaJuridicaLocalStorageService.getEstabelecimentoSelecionado();

    if(estabelecimentoSelecionado) {
      if(this.confrontoService.campoDoEstabelecimentoFoiAlterado(nomeDoCampo, estabelecimentoSelecionado.seqEstabelecimento)) {
        this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', 'orange');
      }
    }

  }

}
