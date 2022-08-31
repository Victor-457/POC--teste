import { Instalacao } from 'src/app/shared/models/Instalacao';
import { StatusRegistroEnum } from 'src/app/shared/models/status-registro-enum.enum';
import { PessoaJuridicaLocalStorageService } from 'src/app/shared/services/pessoa-juridica-local-storage.service';
import { Qualificacao } from './../models/qualificacao';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Injectable({
  providedIn: 'root'
})
export class QualificacaoService {

  constructor(private http: HttpClient,
              private pessoaJuridicaLocalStorageService: PessoaJuridicaLocalStorageService,
              private _configService: RuntimeConfigLoaderService) { }

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this._configService.getConfigObjectKey("apiUrl")}qualificacoes`).pipe(take(1));
  }

  getPorCNPJ(): Qualificacao[] {

    let estabelecimentos = this.pessoaJuridicaLocalStorageService.getEstabelecimentos();
    let qualificacoes: any = [];
    let indexEst: number;
    let indexInst: number;

    for(indexEst = 0; indexEst < estabelecimentos?.length; indexEst++) {

      let estabelecimento = estabelecimentos[indexEst];

      let instalacoes = estabelecimento.instalacoes?.filter(
        function(item: Instalacao){
          return item.statusRegistro != StatusRegistroEnum.REMOVIDO;
        }
      );

      for(indexInst = 0; indexInst < instalacoes?.length; indexInst++) {

        let instalacao = instalacoes[indexInst];
        let tipoInstalacao = instalacao.tipoInstalacao;
        let qualificacao = tipoInstalacao.qualificacao;

        let index = qualificacoes.findIndex(_qualificacao => _qualificacao.codQualificacao == qualificacao.codQualificacao);

        if(index == -1){
          qualificacoes.push(qualificacao);
        }

      }

    }

    qualificacoes = qualificacoes?.sort((a, b) => a.descricao.localeCompare(b.descricao));
    qualificacoes.unshift({codQualificacao: '-1', dataFim: null, dataInicio: null, descricao: 'Todas'});

    return qualificacoes;

  }

  get(){

    let qualificacoes = this.getPorCNPJ();
    let index = qualificacoes.findIndex(_q=>_q.codQualificacao == '-1');

    if(index > -1) {
      qualificacoes.shift();
    }

    return qualificacoes;

  }

}
