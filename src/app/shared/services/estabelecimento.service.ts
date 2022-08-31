import { PessoaJuridicaLocalStorageService } from 'src/app/shared/services/pessoa-juridica-local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private http: HttpClient,
              private pessoaJuridicaLocalStorageService: PessoaJuridicaLocalStorageService,
              private _configService: RuntimeConfigLoaderService) { }

  getPorQualificacao(codQualificacao: string) {

    let pessoaJuridica = this.pessoaJuridicaLocalStorageService.getPessoaJuridica();
    let estabelecimentos = pessoaJuridica.estabelecimentos;
    let resultListEstabelecimentos = [];
    let indexEst: number;
    let indexInst: number;

    for(indexEst = 0; indexEst < estabelecimentos?.length; indexEst++) {

      let estabelecimento = estabelecimentos[indexEst];

      let instalacoes = estabelecimento.instalacoes;

      if(codQualificacao == '-1' && (!instalacoes || instalacoes.length == 0)) {
        resultListEstabelecimentos.push(estabelecimento);
      } else {

        for(indexInst = 0; indexInst < instalacoes?.length; indexInst++) {

          let instalacao = instalacoes[indexInst];
          let tipoInstalacao = instalacao.tipoInstalacao;
          let qualificacao = tipoInstalacao.qualificacao;

          if(codQualificacao == '-1') {

            let index: number = resultListEstabelecimentos.findIndex(_estabelecimento => _estabelecimento.cnpj == estabelecimento.cnpj);

            if(index == -1) {
              resultListEstabelecimentos.push(estabelecimento);
            }

          } else {

            if(codQualificacao == qualificacao.codQualificacao) {

              let index: number = resultListEstabelecimentos.findIndex(_estabelecimento => _estabelecimento.cnpj == estabelecimento.cnpj);

              if(index == -1) {
                resultListEstabelecimentos.push(estabelecimento);
              }

            }

          }

        }

      }

    }

    return resultListEstabelecimentos;

  }

  getDadosRFB(cnpj: string): Observable<any> {

    let body = { cnpj: cnpj };

    return this.http.post<any>(`${this._configService.getConfigObjectKey("apiUrl")}consultar-estabelecimento`, body,
      { headers: { 'Content-Type': 'application/json' } }).pipe(take(1));

  }

  removerEstabelecimento() {

    let estabelecimentoTemp = this.pessoaJuridicaLocalStorageService.getEstabelecimentoTemp();

    if(estabelecimentoTemp) {
      this.pessoaJuridicaLocalStorageService.deleteEstabelecimentoTemp();
    }

  }

}
