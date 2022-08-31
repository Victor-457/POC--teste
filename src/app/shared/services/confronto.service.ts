import { EstabelecimentoService } from './estabelecimento.service';
import { Constants } from './../../core/constants';
import { PessoaJuridicaLocalStorageService } from './pessoa-juridica-local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfrontoService {

  constructor(private pessoaJuridicaLocalStorageService: PessoaJuridicaLocalStorageService) { }

  // getCamposAlteradosAgenteRegulado(){

  // }

  private getCamposDoAgenteReguladoAlteradosPeloConfronto() {

    let pessoaJuridica = this.pessoaJuridicaLocalStorageService.getPessoaJuridica();
    let camposAlteradosPeloConfronto = [];

    if(pessoaJuridica) {

      if(pessoaJuridica.alertaDeConfronto) {
        
        let alertaDeConfronto = pessoaJuridica.alertaDeConfronto;

        if(alertaDeConfronto){

          for(let i in alertaDeConfronto) {

            if(alertaDeConfronto[i]) {
              camposAlteradosPeloConfronto.push(alertaDeConfronto[i]);
            }

          }

        }

      }

    }

    if(camposAlteradosPeloConfronto.length > 0) {
      return camposAlteradosPeloConfronto;
    } else {
      return null;
    }

  }

  private getCamposDoEstabelecimentoAlteradosPeloConfronto(seqEstabelecimento: string) {

    let pessoaJuridica = this.pessoaJuridicaLocalStorageService.getPessoaJuridica();
    let estabelecimentos = pessoaJuridica.estabelecimentos;
    let camposAlteradosPeloConfronto = [];
    let index: number = Constants.NAO_ENCONTRADO;

    index = estabelecimentos.findIndex(e => e.seqEstabelecimento == seqEstabelecimento);

    if(index != Constants.NAO_ENCONTRADO) {

      let estabelecimento = estabelecimentos[index];
      let confronto = estabelecimento.confronto;

      if(confronto) {

        // let alertaDeConfronto = confronto[0];
        let alertaDeConfronto = confronto;

        for(let i in alertaDeConfronto) {

          if(alertaDeConfronto[i]) {
            camposAlteradosPeloConfronto.push(alertaDeConfronto[i]);
          }

        }

      }

    }

    if(camposAlteradosPeloConfronto.length > 0) {
      return camposAlteradosPeloConfronto;
    } else {
      return null;
    }


  }


  campoDoAgenteReguladoFoiAlterado(nomeDoCampo: string): boolean {

    let index = Constants.NAO_ENCONTRADO;

    let camposDoAgenteReguladoAlteradosPeloConfronto = this.getCamposDoAgenteReguladoAlteradosPeloConfronto();

    if(camposDoAgenteReguladoAlteradosPeloConfronto){

      index = camposDoAgenteReguladoAlteradosPeloConfronto.findIndex(_campo => _campo == nomeDoCampo);

    }

    return (index != Constants.NAO_ENCONTRADO);

  }

  campoDoEstabelecimentoFoiAlterado(nomeDoCampo: string, seqEstabelecimento: string): boolean {

    let index: number = Constants.NAO_ENCONTRADO;

    let camposDoEstabelecimentoAlteradosPeloConfronto = this.getCamposDoEstabelecimentoAlteradosPeloConfronto(seqEstabelecimento);

    if(camposDoEstabelecimentoAlteradosPeloConfronto){

      index = camposDoEstabelecimentoAlteradosPeloConfronto.findIndex(_campo => _campo == nomeDoCampo);

    }

    return (index != Constants.NAO_ENCONTRADO);

  }

}
