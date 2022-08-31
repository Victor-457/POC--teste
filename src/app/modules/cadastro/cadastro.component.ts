import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageKeys } from 'src/app/core/constantes/local-storage-keys';
import { Constants } from 'src/app/core/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { PainelEnum } from './../../shared/models/painel-enum.enum';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MeioDeComunicacao } from 'src/app/shared/models/meio-de-comunicacao';
import { EventService } from 'src/app/shared/services/event.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CadastroService } from 'src/app/shared/services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { FinalidadeSimpEnum } from 'src/app/shared/models/finalidade-simp.enum';
import { TipoMeioComunicacaoEnum } from 'src/app/shared/models/tipo-meio-comunicacao-enum.enum';
import { ToastrService } from 'ngx-toastr';
import { TelaEstabelecimentoEnum } from 'src/app/shared/models/tela-estabelecimento-enum.enum';
import { TelaService } from 'src/app/shared/services/tela.service';
import { OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { TelaParametros } from 'src/app/shared/models/tela-parametros';
import { StatusRegistroEnum } from 'src/app/shared/models/status-registro-enum.enum';
import { Mensagens } from 'src/app/core/constantes/mensagens';
import { ModalService } from 'src/app/shared/services/modal.service';
import { take } from 'rxjs/operators';
import { ModoDeUsoEnum } from 'src/app/shared/models/modo-de-uso-enum.enum';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {

  ehConsulta: boolean;
  salvarFoiClicado: boolean;
  finalidadeSIMP: string;
  staticAlertClosed = false;
  mensagemSucesso = '';
  mensagemErro: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  exibirEstabelecimentoLista: boolean;
  exibirEstabelecimentoCadastro: boolean;
  exibirInstalacaoCadastro: boolean;
  public painelEnum = PainelEnum;
  painelCorrente: PainelEnum;
  btnSalvarVisivel: boolean;
  subscription: Subscription[] = [];
  beforeUnloadListener: any;

  constructor(private cadastroService: CadastroService,
              private storageService: StorageService,
              private eventService: EventService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private telaService: TelaService,
              private modalService: ModalService,
              private authService: AuthService,
              private router: Router) {

    this.finalidadeSIMP = localStorage.getItem('finalidadeSIMP');
    this.ehConsulta = (localStorage.getItem('finalidadeSIMP') == FinalidadeSimpEnum.Consultar.toString());
    this.salvarFoiClicado = false;
    this.btnSalvarVisivel = true;

    this.beforeUnloadListener = (event) => {

      if (typeof event == 'undefined'){
        event = window.event;
      }

      event.preventDefault();

      return event.returnValue = "Existem dados pendentes para Salvar. Temporariamente, esses dados poderão ser recuperados num próximo acesso. Confirma a saída do sistema?";

    };

  }

  ngOnInit() {

    // EventService.formularioEditado.subscribe(
    //   ()=> {
    //     this.salvarFoiClicado = false; // Habilita o botão "Salvar".
    //     addEventListener("beforeunload", this.beforeUnloadListener, {capture: true});
    //   }
    // );

    // EventService.logoffOcorrido.subscribe(
    //   ()=> {
    //     removeEventListener("beforeunload", this.beforeUnloadListener, {capture: true});
    //   }
    // );

    // EventService.erroOcorrido.subscribe(
    //   (mensagem: string)=> {
    //     this.toastr.clear();
    //     this.mensagemErro = mensagem;
    //     this.showToastr(mensagem, false);
    //   }
    // );

    // EventService.fechamentoDeAlertSolicitado.subscribe(
    //   ()=> {
    //     this.mensagemErro = '';
    //     this.mensagemSucesso = '';
    //   }
    // );

    // this.subscription.push(this.telaService.getTela()
    // .subscribe(
    //   (telaParametros: TelaParametros) => {

    //     switch(telaParametros?.telaEstabelecimentoDestino){
    //       case TelaEstabelecimentoEnum.EstabelecimentoLista:
    //         this.exibirEstabelecimentoLista = true;
    //         this.exibirEstabelecimentoCadastro = false;
    //         this.exibirInstalacaoCadastro = false;
    //         this.btnSalvarVisivel = true;
    //         window.scrollTo(0, 0)
    //         break;
    //       case TelaEstabelecimentoEnum.EstabelecimentoCadastro:
    //         this.exibirEstabelecimentoLista = false;
    //         this.exibirEstabelecimentoCadastro = true;
    //         this.exibirInstalacaoCadastro = false;
    //         this.btnSalvarVisivel = false;
    //         window.scrollTo(0, 0)
    //         break;
    //       case TelaEstabelecimentoEnum.InstalacaoCadastro:
    //         this.exibirEstabelecimentoLista = false;
    //         this.exibirEstabelecimentoCadastro = false;
    //         this.exibirInstalacaoCadastro = true;
    //         this.btnSalvarVisivel = false;
    //         window.scrollTo(0, 0)
    //         break;
    //     }

    //     this.telaService.sendParameter(telaParametros);
    //     this.habilitarTabs()

    // }));


    // let opcaoDeUso: string = '';
    // let dadosPendentesSalvamento: string;

    // switch(localStorage.getItem('finalidadeSIMP')){
    //   case FinalidadeSimpEnum.Consultar.toString():
    //     opcaoDeUso = ModoDeUsoEnum.CONSULTA;
    //     localStorage.setItem("ModoDeUso", ModoDeUsoEnum.CONSULTA)
    //     break;
    //   case FinalidadeSimpEnum.Atualizar.toString():

    //     //RGN002 -> Login -> Nota-02:
    //     opcaoDeUso = ModoDeUsoEnum.ALTERACAO;
    //     localStorage.setItem("ModoDeUso", ModoDeUsoEnum.ALTERACAO)
    //     this.avaliarExibicaoDeMensagemParaRetornoAposSaidaParcial();

    //     break;
    //   case FinalidadeSimpEnum.Incluir.toString():
    //     opcaoDeUso = ModoDeUsoEnum.NOVO;
    //     localStorage.setItem("ModoDeUso", ModoDeUsoEnum.NOVO)
    //     this.avaliarExibicaoDeMensagemParaRetornoAposSaidaParcial();

    //     break;
    // }

    // this.eventService.emitirEventoOpcaoDeUsoInformada(opcaoDeUso);



    // let telaParametros: TelaParametros = {telaEstabelecimentoDestino: TelaEstabelecimentoEnum.EstabelecimentoLista}
    // this.telaService.mostrar(telaParametros);

  }

  ngOnDestroy(){
    this.subscription.forEach(_subscription => _subscription.unsubscribe());
  }

  avaliarExibicaoDeMensagemParaRetornoAposSaidaParcial(){

    let dadosPendentesSalvamento = localStorage.getItem(LocalStorageKeys.DadosPendentesSalvamento);

    if(dadosPendentesSalvamento && (dadosPendentesSalvamento == 'true')){
      const result$ = this.modalService.showConfirmacao('Atenção!', Mensagens.MensagemParaRetornoAposSaidaParcial, 'Sim', 'Não');
      result$.asObservable().pipe(take(1)).subscribe(
        result => {
          if(!result) {
            this.authService.logoff();
            this.router.navigateByUrl('');
          } else {
            addEventListener("beforeunload", this.beforeUnloadListener, {capture: true});
          }
        }
      );
    }

  }


  salvar() {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    this.eventService.emitirEventoFechamentoDeAlertSolicitado();

    if(!this.enderecoValido(pessoaJuridica)){
      this.eventService.emitirEventoErro("Dados de Endereço não informados!");
      return;
    }

    // RGN010
    if(!this.meiosDeComunicacaoValidos(pessoaJuridica)){
      this.eventService.emitirEventoErro("Dados de Meios de Comunicação não informados. É necessário informar, ao menos, um e-mail e um telefone celular!");
      return;
    }

    if(!this.estabelecimentosValidos(pessoaJuridica)) {
      return;
    }

    this.spinner.show();

    this.cadastroService.salvar().subscribe(
      (_obj: any)=>{

        this.spinner.hide();

        if(_obj.success) {
          this.mensagemSucesso = _obj.message;
          this.showToastr(this.mensagemSucesso);

          localStorage.removeItem(LocalStorageKeys.DadosPendentesSalvamento);

          let pessoaJuridica = _obj.data;

          this.storageService.setObject('pessoaJuridica', pessoaJuridica);

          this.eventService.emitirEventoSalvamentoOcorrido();

          removeEventListener("beforeunload", this.beforeUnloadListener, {capture: true});

        } else {
          this.eventService.emitirEventoErro(_obj.message);
        }

      }, error => {
        this.spinner.hide();
        this.eventService.emitirEventoErro('Ocorreu um erro!');
      }
    );

  }

  onClick(painel: PainelEnum){

    this.painelCorrente = painel;
    if(painel == PainelEnum.Qualificacao) {
        this.eventService.emitirEventoAbaQualificacoesClickada();
    }
  }

  habilitarTabs(){

    if( document.getElementById("tabEnderecoCorrespondencia").classList.contains("disabled") &&
        document.getElementById("tabMeioComunicacao").classList.contains("disabled") &&
        document.getElementById("tabEstabelecimento").classList.contains("disabled") &&
        document.getElementById("tabQualificacao").classList.contains("disabled") )
        {
      document.getElementById("tabLinkEnderecoCorrespondencia").style.pointerEvents="none"
      document.getElementById("tabLinkMeioComunicacao").style.pointerEvents="none"
      document.getElementById("tabLinkEstabelecimento").style.pointerEvents="none"
      document.getElementById("tabLinkQualificacao").style.pointerEvents="none"
      this.btnSalvarVisivel = false;
    }
    else {
      document.getElementById("tabLinkEnderecoCorrespondencia").style.pointerEvents="auto"
      document.getElementById("tabLinkMeioComunicacao").style.pointerEvents="auto"
      document.getElementById("tabLinkEstabelecimento").style.pointerEvents="auto"
      document.getElementById("tabLinkQualificacao").style.pointerEvents="auto"


      this.btnSalvarVisivel = true;
    }
  }

  enderecoValido(pessoaJuridica: any){
    let valid = true;

    // validar obrigatoriedade de logradouro;
    if(!pessoaJuridica.logradouro && valid) {
      valid = false;
    }

    // validar obrigatoriedade de número;
    if(!pessoaJuridica.numero && valid) {
      valid = false;
    }

    // validar obrigatoriedade de município;
    if(!pessoaJuridica.municipio && valid) {
      valid = false;
    }

    // validar obrigatoriedade de uf;
    if(!pessoaJuridica.uf && valid) {
      valid = false;
    }

    // validar obrigatoriedade de cep;
    if(!pessoaJuridica.cep && valid) {
      valid = false;
    }

    return valid;

  }

  // RGN010
  meiosDeComunicacaoValidos(pessoaJuridica: any){

    let existeUmEmail: boolean = false;
    let existeUmTelefoneCelular: boolean = false;

    let meiosComunicacao = pessoaJuridica.meiosComunicacao;

    let i: number;

    for(i=0; i<meiosComunicacao.length;i++){

      let meioComunicacao: MeioDeComunicacao = meiosComunicacao[i];

      if((meioComunicacao.tipoMeioComunicacao.codTipoMeioComunicacao==TipoMeioComunicacaoEnum.Email.toString()) && !existeUmEmail && (meioComunicacao.statusRegistro != StatusRegistroEnum.REMOVIDO)){
        existeUmEmail = true;
      }

      if((meioComunicacao.tipoMeioComunicacao.codTipoMeioComunicacao==TipoMeioComunicacaoEnum.TelefoneCelular.toString()) && !existeUmTelefoneCelular && (meioComunicacao.statusRegistro != StatusRegistroEnum.REMOVIDO)){
        existeUmTelefoneCelular = true;
      }

      if(existeUmEmail && existeUmTelefoneCelular) {
        break;
      }

    }

    return (existeUmEmail && existeUmTelefoneCelular);

  }

  estabelecimentosValidos(pessoaJuridica: any): boolean {

    let estabelecimentos = pessoaJuridica.estabelecimentos;

    let index: number = estabelecimentos.findIndex(_estabelecimento => _estabelecimento.indMatriz == Constants.SIM);

    // RGN010
    if(index == Constants.NAO_ENCONTRADO){
      this.eventService.emitirEventoErro('Dados de Matriz não informados');
      return false;
    }

    let valid: boolean = true;
    for(index = 0; index < estabelecimentos.length; index++) {

      if(estabelecimentos[index].indMatriz == Constants.NAO && estabelecimentos[index].statusRegistro != StatusRegistroEnum.REMOVIDO){

        let instalacoes = estabelecimentos[index].instalacoes?.filter(
          function(item){
            return item.statusRegistro != StatusRegistroEnum.REMOVIDO;
          }
        );

        if(!instalacoes || instalacoes.length == 0) {
          this.eventService.emitirEventoErro('Filial deve ter, ao menos, uma instalação');
          valid = false;
          break;
        }

      }

    }

    return valid;

  }

  onFecharAlertSuccess() {
    this.mensagemSucesso = '';
  }

  onFecharAlertErro() {
    this.mensagemErro = '';
  }

  showToastr(mensagem: string, isSuccess: boolean = true) {

    if(isSuccess){
      this.toastr.success(mensagem, '');
    } else {
      this.toastr.error(mensagem, '', { timeOut: 6000 });
    }
  }

}
