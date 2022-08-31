import { LocalStorageKeys } from 'src/app/core/constantes/local-storage-keys';
import { TelaEstabelecimentoEnum } from './../models/tela-estabelecimento-enum.enum';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Constants } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static erroOcorrido = new EventEmitter<string>();
  static formularioEditado = new EventEmitter<string>();
  static usuarioLogou = new EventEmitter<Usuario>();
  static salvouLocalmente = new EventEmitter<string>();
  static abaClickada = new EventEmitter();
  static abaQualificacoesClickada = new EventEmitter();
  static fechamentoDeAlertSolicitado = new EventEmitter();
  static opcaoDeUsoInformada = new EventEmitter<string>();
  static telaEstabelecimentoSolicitada = new EventEmitter<TelaEstabelecimentoEnum>();
  static detalhamentoDeEstabelecimentoSolicitado = new EventEmitter<any>();
  static salvamentoOcorrido = new EventEmitter();
  static confrontoOcorrido = new EventEmitter();
  static alteracaoDeDadosNoConfronto = new EventEmitter<any>();
  static logoffOcorrido = new EventEmitter();

  constructor() { }

  emitirEventoErro(mensagem: string) {
    EventService.erroOcorrido.emit(mensagem);
  }

  emitirEventoFormularioEditado(nomeFormulario: string) {
    EventService.formularioEditado.emit(nomeFormulario);
    localStorage.setItem(LocalStorageKeys.DadosPendentesSalvamento, Constants.VERDADEIRO);
  }

  emitirEventoUsuarioLogou(usuario: Usuario) {
    EventService.usuarioLogou.emit(usuario);
  }

  emitirEventoSalvouLocalmente(mensagem: string) {
    EventService.salvouLocalmente.emit(mensagem);
  }

  emitirEventoAbaClickada() {
    EventService.abaClickada.emit();
  }

  emitirEventoAbaQualificacoesClickada() {
    EventService.abaQualificacoesClickada.emit();
  }

  emitirEventoFechamentoDeAlertSolicitado() {
    EventService.fechamentoDeAlertSolicitado.emit();
  }

  emitirEventoOpcaoDeUsoInformada(mensagem: string) {
    EventService.opcaoDeUsoInformada.emit(mensagem);
  }

  emitirEventoTelaEstabelecimentoSolicitada(telaEstabelecimento: TelaEstabelecimentoEnum) {
    EventService.telaEstabelecimentoSolicitada.emit(telaEstabelecimento);
  }

  emitirEventoDetalhamentoDeEstabelecimentoSolicitado(estabelecimento: any){
    EventService.detalhamentoDeEstabelecimentoSolicitado.emit(estabelecimento);
  }

  emitirEventoSalvamentoOcorrido(){
    EventService.salvamentoOcorrido.emit();
  }

  emitirEventoConfrontoOcorrido(){
    EventService.confrontoOcorrido.emit();
  }

  emitirEventoLogoffOcorrido(){
    EventService.logoffOcorrido.emit();
  }

  emitirEventoAlteracaoDeDadosNoConfronto(result: any){
    EventService.alteracaoDeDadosNoConfronto.emit(result);
  }

}
