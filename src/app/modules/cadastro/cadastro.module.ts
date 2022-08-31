import { IdentificacaoModule } from './../identificacao/identificacao.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
import { RouterModule } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { FundoAmareloModule } from 'src/app/shared/directives/fundo-amarelo.module';

@NgModule({
  imports: [
    CommonModule,
    IdentificacaoModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: CadastroComponent
      }
    ]),
    FundoAmareloModule
  ],
  declarations: [CadastroComponent],
  exports: [CadastroComponent]
})
export class CadastroModule { }
