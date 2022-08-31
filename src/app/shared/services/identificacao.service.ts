import { Injectable } from '@angular/core';
import { Identificacao } from '../models/identificacao';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class IdentificacaoService {

  constructor(private storageService: StorageService) { }

  salvarIdentificacao(identificacao: Identificacao) {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');
    pessoaJuridica.raizCNPJ = identificacao.raizCNPJ;
    pessoaJuridica.nomeEmpresarial = identificacao.nomeEmpresarial;
    pessoaJuridica.nomeFantasia = identificacao.nomeFantasia;

    this.storageService.setObject('pessoaJuridica', pessoaJuridica);

  }

  recuperarIdentificacao() {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');
    let identificacao: Identificacao = {raizCNPJ: pessoaJuridica.raizCNPJ,
                                        nomeEmpresarial: pessoaJuridica.nomeEmpresarial,
                                        nomeFantasia: pessoaJuridica.nomeFantasia,
                                        cNPJResponsavel: pessoaJuridica.documento} ;

    if(identificacao != null) {
      return identificacao;
    }

  }

}
