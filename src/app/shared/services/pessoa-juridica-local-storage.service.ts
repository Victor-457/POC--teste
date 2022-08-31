import { LocalStorageKeys } from 'src/app/core/constantes/local-storage-keys';
import { Estabelecimento } from './../models/estabelecimento';
import { MeioDeComunicacao } from 'src/app/shared/models/meio-de-comunicacao';
import { StatusRegistroEnum } from 'src/app/shared/models/status-registro-enum.enum';
import { Identificacao } from 'src/app/shared/models/identificacao';
import { EnderecoCorrespondencia } from 'src/app/shared/models/endereco-correspondencia';
import { Constants } from 'src/app/core/constants';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaLocalStorageService {

  constructor(private storageService: StorageService) { }

  getCNPJResponsavel() {

    let pessoaJuridica: any = this.getPessoaJuridica();
    let cnpjResponsavel: string = pessoaJuridica.cnpjResponsavel;

    return cnpjResponsavel;

  }

  getPessoaJuridica(): any {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    return pessoaJuridica;

  }

  setPessoaJuridica(pessoaJuridica: any): void {
    this.storageService.setObject('pessoaJuridica', pessoaJuridica);
  }

  getSeqAgenteRegulado() {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    return pessoaJuridica.seqAgenteRegulado;

  }

  getIdentificacao(): Identificacao {

    let pessoaJuridica = this.getPessoaJuridica();
    let identificacao: Identificacao = {raizCNPJ: pessoaJuridica.raizCNPJ,
                                        nomeEmpresarial: pessoaJuridica.nomeEmpresarial,
                                        nomeFantasia: pessoaJuridica.nomeFantasia,
                                        cNPJResponsavel: pessoaJuridica.documento} ;

    return identificacao;

  }

  updateIdentificacao(identificacao: Identificacao): void {

    let pessoaJuridica = this.getPessoaJuridica();

    pessoaJuridica.raizCNPJ = identificacao.raizCNPJ;
    pessoaJuridica.nomeEmpresarial = identificacao.nomeEmpresarial;
    pessoaJuridica.nomeFantasia = identificacao.nomeFantasia;

    this.storageService.setObject('pessoaJuridica', pessoaJuridica);

  }

  getEnderecoCorrespondencia(): EnderecoCorrespondencia {

    let pessoaJuridica = this.getPessoaJuridica();

    let endereco: EnderecoCorrespondencia = {
      logradouro: pessoaJuridica.logradouro,
      numero: pessoaJuridica.numero,
      complemento: pessoaJuridica.complemento,
      bairro: pessoaJuridica.bairro,
      municipio: pessoaJuridica.municipio,
      uf: pessoaJuridica.uf,
      cep: pessoaJuridica.cep,
    };

    return endereco;

  }

  updateEnderecoCorrespondencia(enderecoCorrespondencia: EnderecoCorrespondencia): void {

    let pessoaJuridica = this.getPessoaJuridica();

    pessoaJuridica.logradouro = enderecoCorrespondencia.logradouro;
    pessoaJuridica.numero = enderecoCorrespondencia.numero;
    pessoaJuridica.complemento = enderecoCorrespondencia.complemento;
    pessoaJuridica.bairro = enderecoCorrespondencia.bairro;
    pessoaJuridica.municipio = enderecoCorrespondencia.municipio;
    pessoaJuridica.uf = enderecoCorrespondencia.uf;
    pessoaJuridica.cep = enderecoCorrespondencia.cep;

    this.storageService.setObject('pessoaJuridica', pessoaJuridica);

  }

  getMeioDeComunicacaoPoSeqContatoAgente(seqContatoAgente: number): any {

    let pessoaJuridica = this.getPessoaJuridica();

    let index: number = pessoaJuridica.meiosComunicacao.findIndex(_meioComunicacao => _meioComunicacao.seqContatoAgente == seqContatoAgente);

    if(index == Constants.NAO_ENCONTRADO) {
      return null;
    }

    return pessoaJuridica.meiosComunicacao[index];

  }

  getMeiosComunicacao() {

    let pessoaJuridica = this.getPessoaJuridica();

    let meiosComunicacaoNaoRemovidos: MeioDeComunicacao[] = [];

    meiosComunicacaoNaoRemovidos = pessoaJuridica.meiosComunicacao.filter(
      function(item: MeioDeComunicacao) {
        return item.statusRegistro != StatusRegistroEnum.REMOVIDO;
      }
    );


    return meiosComunicacaoNaoRemovidos;

  }

  insertMeioDeComunicacao(meioDeComunicacao: MeioDeComunicacao) {

    let pessoaJuridica = this.getPessoaJuridica();

    if(!pessoaJuridica.meiosComunicacao) {
      pessoaJuridica.meiosComunicacao = [];
    }

    meioDeComunicacao.statusRegistro = StatusRegistroEnum.NOVO;

    pessoaJuridica.meiosComunicacao.push(meioDeComunicacao);

    this.storageService.setObject('pessoaJuridica', pessoaJuridica);

  }

  updateMeioDeComunicacao(meioDeComunicacao: MeioDeComunicacao) {

    let pessoaJuridica = this.getPessoaJuridica();

    let index: number = pessoaJuridica.meiosComunicacao.findIndex(_meioComunicacao => _meioComunicacao.seqContatoAgente == meioDeComunicacao.seqContatoAgente);

    if(index != Constants.NAO_ENCONTRADO) {

      // seqContatoAgente negativo representa um novo meio de comunicação!
      if(pessoaJuridica.meiosComunicacao[index].seqContatoAgente > 0){
        pessoaJuridica.meiosComunicacao[index].statusRegistro = StatusRegistroEnum.ALTERADO;
      }

      pessoaJuridica.meiosComunicacao[index].descricaoMeioComunicacao = meioDeComunicacao.descricaoMeioComunicacao;
      pessoaJuridica.meiosComunicacao[index].complementoMeioComunicacao = meioDeComunicacao.complementoMeioComunicacao;

      this.storageService.setObject('pessoaJuridica', pessoaJuridica);

    }

  }

  deleteMeioDeComunicacao(meioDeComunicacao: MeioDeComunicacao){

    let pessoaJuridica = this.getPessoaJuridica();

    let index: number = pessoaJuridica.meiosComunicacao.findIndex(_meioComunicacao => _meioComunicacao.seqContatoAgente == meioDeComunicacao.seqContatoAgente);

    if(index != Constants.NAO_ENCONTRADO) {

      // seqContatoAgente negativo representa um novo meio de comunicação!
      if(pessoaJuridica.meiosComunicacao[index].seqContatoAgente > 0){
        pessoaJuridica.meiosComunicacao[index].statusRegistro = StatusRegistroEnum.REMOVIDO; // Marcado para ser removido da base de dados pelo backend!
      } else {
        pessoaJuridica.meiosComunicacao.splice(index, 1); // Remove fisicamente o meio de comunicação do local storage!
      }

      this.storageService.setObject('pessoaJuridica', pessoaJuridica);

    }

  }

  getEstabelecimentoPorCNPJ(cnpj: string): any {

    let pessoaJuridica: any = this.getPessoaJuridica();

    let index: number = pessoaJuridica.estabelecimentos.findIndex(_estabelecimento => _estabelecimento.cnpj == cnpj && (_estabelecimento.statusRegistro != StatusRegistroEnum.REMOVIDO));

    if(index == Constants.NAO_ENCONTRADO) {
      return null;
    }

    return pessoaJuridica.estabelecimentos[index];

  }

  getEndMatriz(): string {

    let pessoaJuridica: any = this.getPessoaJuridica();

    return pessoaJuridica.endMatriz;

  }

  setEndMatriz(endMatriz: string) {

    let pessoaJuridica: any = this.getPessoaJuridica();

    pessoaJuridica.endMatriz = endMatriz;

    this.setPessoaJuridica(pessoaJuridica);

  }

  converterTodosOsEstabelecimentosEmFilial() {

    let pessoaJuridica = this.getPessoaJuridica();

    if(pessoaJuridica.estabelecimentos) {

      for(let i=0; i<pessoaJuridica.estabelecimentos.length; i++) {
        pessoaJuridica.estabelecimentos[i].indMatriz = Constants.NAO;
      }

    }

    this.setPessoaJuridica(pessoaJuridica);

  }

  getEstabelecimentoMatriz(): any {

    let pessoaJuridica: any = this.getPessoaJuridica();

    let index: number = pessoaJuridica.estabelecimentos.findIndex(_estabelecimento => _estabelecimento.indMatriz == Constants.SIM);

    if(index == Constants.NAO_ENCONTRADO) {
      return null;
    }

    return pessoaJuridica.estabelecimentos[index];

  }

  getEstabelecimentos(): any{

    let pessoaJuridica: any = this.getPessoaJuridica();

    if(pessoaJuridica.estabelecimentos) {

      let estabelecimentos = pessoaJuridica.estabelecimentos;

      let estabelecimentosNaoRemovidos = estabelecimentos.filter(

        function(item) {
          return item.statusRegistro != StatusRegistroEnum.REMOVIDO;
        }

      );

      return estabelecimentosNaoRemovidos;

    } else {

      return null;

    }

  }

  insertEstabelecimento(estabelecimento: any): any {

    let pessoaJuridica: any = this.getPessoaJuridica();

    if(!pessoaJuridica.estabelecimentos) {
      pessoaJuridica.estabelecimentos = [];
    }

    estabelecimento.statusRegistro = StatusRegistroEnum.NOVO;

    pessoaJuridica.estabelecimentos.push(estabelecimento);
    this.storageService.setObject('pessoaJuridica', pessoaJuridica);

  }

  updateEstabelecimento(estabelecimento: any): void {

    let pessoaJuridica: any = this.getPessoaJuridica();
    let index: number = pessoaJuridica.estabelecimentos.findIndex(_estabelecimento => _estabelecimento.cnpj == estabelecimento.cnpj);

    if(index != Constants.NAO_ENCONTRADO) {

      if(estabelecimento.seqEstabelecimento) {
        estabelecimento.statusRegistro = StatusRegistroEnum.ALTERADO;
      }

      pessoaJuridica.estabelecimentos[index] = estabelecimento;
      this.storageService.setObject('pessoaJuridica', pessoaJuridica);
    }

  }

  deleteEstabelecimento(cnpj: string) {

    let pessoaJuridica: any = this.getPessoaJuridica();
    let index: number = pessoaJuridica.estabelecimentos.findIndex(_estabelecimento => _estabelecimento.cnpj == cnpj);

    if(index != Constants.NAO_ENCONTRADO) {

      if(pessoaJuridica.estabelecimentos[index].seqEstabelecimento) { // Se não for nulo, veio da API!

        let i: number;

        for(i=0;i<pessoaJuridica.estabelecimentos[index].instalacoes?.length;i++) {

          if(pessoaJuridica.estabelecimentos[index].instalacoes[i].seqInstalacao) { // Se não for nulo, é alteração!
            pessoaJuridica.estabelecimentos[index].instalacoes[i].statusRegistro = StatusRegistroEnum.REMOVIDO;
          } else {
            pessoaJuridica.estabelecimentos[index].instalacoes.splice(i,1); // Se for nulo é novo!
          }

        }

        pessoaJuridica.estabelecimentos[index].statusRegistro = StatusRegistroEnum.REMOVIDO;
      } else {
        pessoaJuridica.estabelecimentos.splice(index, 1); // Se for nulo, é novo. Será removido fisicamente do local storage!
      }

      this.storageService.setObject('pessoaJuridica', pessoaJuridica);
    }

  }

  getInstalacoesPorCNPJ(cnpj: string): any {

    let pessoaJuridica = this.getPessoaJuridica();
    let index: number = pessoaJuridica.estabelecimentos.findIndex(_estabelecimento => _estabelecimento.cnpj == cnpj);
    let instalacoes: any;

    if(index != Constants.NAO_ENCONTRADO) {
      let instalacoesNaoRemovidas = pessoaJuridica.estabelecimentos[index].instalacoes;

      instalacoes = instalacoesNaoRemovidas.filter(
        function(item){
          return item.statusRegistro != StatusRegistroEnum.REMOVIDO;
        }
      );
    }


    return instalacoes;

  }

  getInstalacaoPorCodInstalacao(codInstalacao: string): any {

    let instalacao: any = null;

    let estabelecimento: Estabelecimento;

    let estabelecimentoObtidoNaRFB: Estabelecimento = this.getEstabelecimentoObtidoNaRFB();
    if(estabelecimentoObtidoNaRFB){
      estabelecimento = estabelecimentoObtidoNaRFB;
    }

    let estabelecimentoSelecionado: Estabelecimento = this.getEstabelecimentoSelecionado();
    if(estabelecimentoSelecionado){
      estabelecimento = estabelecimentoSelecionado;
    }

    if(estabelecimento) {

      if(estabelecimento.instalacoes && estabelecimento.instalacoes.length > 0) {

        let instalacoes = estabelecimento.instalacoes;
        let index: number = instalacoes.findIndex(_instalacao => _instalacao.codInstalacao == codInstalacao);

        if(index != Constants.NAO_ENCONTRADO) {
          instalacao = instalacoes[index];
        }

      }

    }

    return instalacao;

  }

  deleteInstalacao(codInstalacao: string) {

    let estabelecimento: Estabelecimento = this.getEstabelecimentoTemp();

    if(estabelecimento) {

      let indexInstalacao = estabelecimento.instalacoes.findIndex(_instalacao => _instalacao.codInstalacao == codInstalacao);

      if(indexInstalacao != Constants.NAO_ENCONTRADO) {

        let instalacao = estabelecimento.instalacoes[indexInstalacao];

        if(instalacao.seqInstalacao){ // Se não for nulo, veio da API!

          instalacao.statusRegistro = StatusRegistroEnum.REMOVIDO;
          estabelecimento.statusRegistro = StatusRegistroEnum.ALTERADO;

        }else{
          estabelecimento.instalacoes.splice(indexInstalacao, 1); // Se não for nulo, é novo. Então, removo do local storage!
        }

        if(this.estabelecimentoFoiObtidoNaRFB()){
          this.setEstabelecimentoObtidoNaRFB(estabelecimento);
        }

        if(this.estabelecimentoFoiSelecionadoParaAlteracao()){
          this.setEstabelecimentoSelecionado(estabelecimento);
        }

      }

    }

  }

  setEstabelecimentoObtidoNaRFB(estabelecimentoObtidoNaRFB: Estabelecimento){
    this.storageService.setObject(LocalStorageKeys.EstabelecimentoObtidoNaRFB, estabelecimentoObtidoNaRFB);
  }

  getEstabelecimentoObtidoNaRFB(): Estabelecimento {
    return this.storageService.getObject(LocalStorageKeys.EstabelecimentoObtidoNaRFB);
  }

  deleteEstabelecimentoObtidoNaRFB(){
    localStorage.removeItem(LocalStorageKeys.EstabelecimentoObtidoNaRFB);
  }

  setEstabelecimentoSelecionado(estabelecimentoSelecionado: Estabelecimento){
    this.storageService.setObject('estabelecimentoSelecionado', estabelecimentoSelecionado);
  }

  getEstabelecimentoSelecionado(): Estabelecimento {
    return this.storageService.getObject('estabelecimentoSelecionado');
  }

  deleteEstabelecimentoSelecionado(){
    localStorage.removeItem('estabelecimentoSelecionado');
  }

  setEstabelecimentoObservacao(observacao) {

    let estabelecimentoObtidoNaRFB = this.getEstabelecimentoObtidoNaRFB();
    if(estabelecimentoObtidoNaRFB) {
      estabelecimentoObtidoNaRFB.observacao = observacao;
      this.setEstabelecimentoObtidoNaRFB(estabelecimentoObtidoNaRFB);
    }

    let estabelecimentoSelecionado = this.getEstabelecimentoSelecionado();
    if(estabelecimentoSelecionado) {
      estabelecimentoSelecionado.observacao = observacao;
      this.setEstabelecimentoSelecionado(estabelecimentoSelecionado);
    }

  }

  getEstabelecimentoTemp(): Estabelecimento {

    let estabelecimento: Estabelecimento;

    let estabelecimentoObtidoNaRFB: Estabelecimento = this.getEstabelecimentoObtidoNaRFB();
    if(estabelecimentoObtidoNaRFB){
      estabelecimento = estabelecimentoObtidoNaRFB;
    }

    let estabelecimentoSelecionado: Estabelecimento = this.getEstabelecimentoSelecionado();
    if(estabelecimentoSelecionado){
      estabelecimento = estabelecimentoSelecionado;
    }

    return estabelecimento;

  }

  deleteEstabelecimentoTemp() {

    let estabelecimento = this.getEstabelecimentoObtidoNaRFB();

    if(estabelecimento) {
      localStorage.removeItem(LocalStorageKeys.EstabelecimentoObtidoNaRFB);
    }

    estabelecimento = this.getEstabelecimentoSelecionado();

    if(estabelecimento) {
      localStorage.removeItem(LocalStorageKeys.EstabelecimentoSelecionado);
    }

  }

  estabelecimentoFoiObtidoNaRFB(): boolean {

    let value: boolean = this.getEstabelecimentoObtidoNaRFB() ? true : false;

    return value;

  }

  estabelecimentoFoiSelecionadoParaAlteracao(): boolean {

    let value: boolean = this.getEstabelecimentoSelecionado() ? true : false;

    return value;

  }

}
