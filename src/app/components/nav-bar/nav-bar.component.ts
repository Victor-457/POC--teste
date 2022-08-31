import { Mensagens } from './../../core/constantes/mensagens';
import { Constants } from 'src/app/core/constants';
import { ModalService } from './../../shared/services/modal.service';
import { FinalidadeSimpEnum } from './../../shared/models/finalidade-simp.enum';
import { EventService } from './../../shared/services/event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { take } from 'rxjs/operators';
import { LocalStorageKeys } from 'src/app/core/constantes/local-storage-keys';

@Component({
  selector: 'navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  nomeFuncionario: string;
  nomeEmpresarial: string;
  raizCNPJ: string;

  constructor(private router: Router,
              private authService: AuthService,
              private eventService: EventService,
              private modalService: ModalService) { }

  ngOnInit() {
    EventService.usuarioLogou.subscribe(

      usuario=> {

        localStorage.setItem('nomeFuncionario', usuario.nome);
        localStorage.setItem('nomeEmpresarial', usuario.nomeEmpresarial);
        localStorage.setItem('raizCNPJ', usuario.cnpj.substr(0,8));

        this.nomeFuncionario = localStorage.getItem('nomeFuncionario');
        this.nomeEmpresarial = localStorage.getItem('nomeEmpresarial');
        this.raizCNPJ = localStorage.getItem('raizCNPJ');
      }

    );

    this.nomeFuncionario = localStorage.getItem('nomeFuncionario');
    this.nomeEmpresarial = localStorage.getItem('nomeEmpresarial');
    this.raizCNPJ = localStorage.getItem('raizCNPJ');

  }

  logoff() {

    let dadosPendentesSalvamento: boolean = localStorage.getItem(LocalStorageKeys.DadosPendentesSalvamento) ? true : false;

    let finalidadeSIMP: string = localStorage.getItem('finalidadeSIMP');

    if((finalidadeSIMP != FinalidadeSimpEnum.Consultar.toString()) && dadosPendentesSalvamento) {

      const result$ = this.modalService.showConfirmacao('Atenção!', Mensagens.MensagemParaSaidaDefinitiva, 'Sim', 'Não');
      result$.asObservable().pipe(take(1)).subscribe(
        result => {
          if(result) {
            this.eventService.emitirEventoLogoffOcorrido();
            this.descartarERedirecionarParaLogin();
          }
        }
      );

    } else {
      this.descartarERedirecionarParaLogin();
    }

  }

  descartarERedirecionarParaLogin() {
    this.descartarLocalStorageData()
    this.router.navigateByUrl('');
  }

  descartarLocalStorageData(){

    this.eventService.emitirEventoOpcaoDeUsoInformada("");
    this.authService.logoff();

  }

  estaLogado(): boolean {
    return this.authService.estaLogado();
  }

  rotearParaInicio() {

    let finalidadeSIMP: string = localStorage.getItem('finalidadeSIMP');

    if((finalidadeSIMP == FinalidadeSimpEnum.Consultar.toString()) || (finalidadeSIMP == FinalidadeSimpEnum.Atualizar.toString())){
      this.router.navigateByUrl('menu');
    } else {
      this.router.navigateByUrl('cadastro');
    }

  }

}
