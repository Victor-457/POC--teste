import { TreeModule } from 'primeng/tree';
import { FundoAmareloModule } from './../../shared/directives/fundo-amarelo.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentificacaoComponent } from './identificacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SimpTimerModule } from 'src/app/components/simp-timer/simp-timer.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    FundoAmareloModule,
    CarouselModule,
    TreeModule,
    AccordionModule,

  ],
  declarations: [
    IdentificacaoComponent,

  ],
  exports: [IdentificacaoComponent]
})
export class IdentificacaoModule { }
