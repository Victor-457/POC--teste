import { MeioDeComunicacao } from 'src/app/shared/models/meio-de-comunicacao';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MeioDeComunicacaoService {

  constructor(private storageService: StorageService) { }

  getCount(): number {
    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');
    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;
    let count: number = meiosDeComunicacao.length;
    return count;
  }

  adicionar(meioDeComunicacao: MeioDeComunicacao) {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;

    meiosDeComunicacao.push(meioDeComunicacao);

    pessoaJuridica.meiosComunicacao = meiosDeComunicacao;

    this.storageService.setObject('pessoaJuridica', pessoaJuridica);

  }

  excluir(meioDeComunicacao: MeioDeComunicacao) {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');
    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;
    let indexProcurado: number;

    indexProcurado = this.getIndexPorSeqContatoAgente(meioDeComunicacao.seqContatoAgente);

    if(indexProcurado > -1){

        let newMeiosDeComunicacao: any = [];
        let indexCorrente: number;
        let meioDeComunicacao: MeioDeComunicacao;

        for(indexCorrente=0; indexCorrente<meiosDeComunicacao.length; indexCorrente++){

          meioDeComunicacao = meiosDeComunicacao[indexCorrente];

          if(indexProcurado != indexCorrente) {
            newMeiosDeComunicacao.push(meioDeComunicacao);
          }

        }

        pessoaJuridica.meiosComunicacao = newMeiosDeComunicacao;
        this.storageService.setObject('pessoaJuridica', pessoaJuridica);

    }

  }

  alterar(meioDeComunicacao: MeioDeComunicacao) {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;

    let i: number;

    i = this.getIndexPorSeqContatoAgente(meioDeComunicacao.seqContatoAgente)

    if(i > -1){

      meiosDeComunicacao[i].descricaoMeioComunicacao = meioDeComunicacao.descricaoMeioComunicacao;
      meiosDeComunicacao[i].complementoMeioComunicacao = meioDeComunicacao.complementoMeioComunicacao;
      pessoaJuridica.meiosComunicacao = meiosDeComunicacao;
      this.storageService.setObject('pessoaJuridica', pessoaJuridica);

    }

  }

  // Busca sequencial por assunto.id, codTipoMeioComunicacao, descricaoMeioComunicacao e complementoMeioComunicacao:
  recuperarIndice(meioDeComunicacao: MeioDeComunicacao): number {

    let resultIndex: number = -1;

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;

    let count: number = meiosDeComunicacao.length;
    let i: number;

    for(i = 0; i < count; i++) {

      if(meiosDeComunicacao[i].assunto.id == meioDeComunicacao.assunto.id &&
        meiosDeComunicacao[i].tipoMeioComunicacao.codTipoMeioComunicacao == meioDeComunicacao.tipoMeioComunicacao.codTipoMeioComunicacao &&
        meiosDeComunicacao[i].descricaoMeioComunicacao == meioDeComunicacao.descricaoMeioComunicacao &&
        meiosDeComunicacao[i].complementoMeioComunicacao == meioDeComunicacao.complementoMeioComunicacao){

          resultIndex = i;
          break;

      }

    }

    return resultIndex;

  }

  getTodos() {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;

    return meiosDeComunicacao;
  }

  // Busca sequencial por seqContatoAgente:
  getIndexPorSeqContatoAgente(seqContatoAgente: number): number {

    let resultIndex: number = -1;

    if(!seqContatoAgente) {
      return resultIndex;
    }

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosDeComunicacao = pessoaJuridica.meiosComunicacao;

    let count: number = meiosDeComunicacao.length;
    let i: number;

    for(i = 0; i < count; i++) {

      if(meiosDeComunicacao[i].seqContatoAgente == seqContatoAgente){

          resultIndex = i;
          break;

      }

    }

    return resultIndex;

  }

}
