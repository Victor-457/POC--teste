import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundoAmareloDirective } from './fundo-amarelo.directive';
import { EstabelecimentoAlteradoPeloConfrontoDirective } from './estabelecimento-alterado-pelo-confronto.directive';



@NgModule({
  declarations: [FundoAmareloDirective, EstabelecimentoAlteradoPeloConfrontoDirective],
  exports:[FundoAmareloDirective, EstabelecimentoAlteradoPeloConfrontoDirective],
  imports: [
    CommonModule
  ]
})
export class FundoAmareloModule { }
