import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimOuNaoPipe } from './sim-ou-nao.pipe';



@NgModule({
  declarations: [SimOuNaoPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SimOuNaoPipe
  ]
})
export class PipesModule { }
