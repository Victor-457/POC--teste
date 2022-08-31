import { FundoAmareloModule } from './shared/directives/fundo-amarelo.module';
import { BulletinBoardComponent } from './components/bulletin-board/bulletin-board.component';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RuntimeConfigLoaderModule } from 'runtime-config-loader';
import { RaizCnpjPipe } from './shared/pipes/raiz-cnpj.pipe';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CnpjFormatadoPipe } from './shared/pipes/cnpj-formatado.pipe';
import { TooltipModule  } from 'ngx-bootstrap/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { InterceptorModule } from './core/interceptors/interceptor/interceptor.module';
import { HttpClientModule } from '@angular/common/http';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      BulletinBoardComponent,
      FooterComponent,
      RaizCnpjPipe,
      CnpjFormatadoPipe

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InterceptorModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    RuntimeConfigLoaderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      timeOut: 6000,
      preventDuplicates: true
    }),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    CadastroModule,
    TooltipModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    FundoAmareloModule,

  ],
  exports: [],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
