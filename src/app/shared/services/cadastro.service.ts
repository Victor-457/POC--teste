import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }

  salvar(): Observable<any> {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosComunicacao = pessoaJuridica.meiosComunicacao;

    let index: number;

    for(index = 0; index < meiosComunicacao.length; index++) {

      if(meiosComunicacao[index].seqContatoAgente < 0) {
        meiosComunicacao[index].seqContatoAgente = null;
      }

    }

    pessoaJuridica.meiosComunicacao = meiosComunicacao;

    let body = {
      raizCNPJ: pessoaJuridica.raizCNPJ,
      nomeEmpresarial: pessoaJuridica.nomeEmpresarial,
      nomeFantasia: pessoaJuridica.nomeFantasia,
      logradouro: pessoaJuridica.logradouro,
      numero: pessoaJuridica.numero,
      complemento: pessoaJuridica.complemento,
      bairro: pessoaJuridica.bairro,
      municipio: pessoaJuridica.municipio,
      uf: pessoaJuridica.uf,
      cep: pessoaJuridica.cep,
      cnpjResponsavel: pessoaJuridica.cnpjResponsavel,
      fonteDados: pessoaJuridica.fonteDados,
      meiosComunicacao: pessoaJuridica.meiosComunicacao,
      seqAgenteRegulado: pessoaJuridica.seqAgenteRegulado,
      estabelecimentos: pessoaJuridica.estabelecimentos,
      codLocalidade: pessoaJuridica.codLocalidade,
      endMatriz: pessoaJuridica.endMatriz
    };

    return this.http.post<any>(`${this._configService.getConfigObjectKey("apiUrl")}agente-add`, body,
    { headers: { 'Content-Type': 'application/json' } }).pipe(take(1));

  }

  confrontar(): Observable<any> {

    let pessoaJuridica = this.storageService.getObject('pessoaJuridica');

    let meiosComunicacao = pessoaJuridica.meiosComunicacao;

    let index: number;

    for(index = 0; index < meiosComunicacao.length; index++) {

      if(meiosComunicacao[index].seqContatoAgente < 0) {
        meiosComunicacao[index].seqContatoAgente = null;
      }

    }

    pessoaJuridica.meiosComunicacao = meiosComunicacao;

    let body = {
      raizCNPJ: pessoaJuridica.raizCNPJ,
      nomeEmpresarial: pessoaJuridica.nomeEmpresarial,
      nomeFantasia: pessoaJuridica.nomeFantasia,
      logradouro: pessoaJuridica.logradouro,
      numero: pessoaJuridica.numero,
      complemento: pessoaJuridica.complemento,
      bairro: pessoaJuridica.bairro,
      municipio: pessoaJuridica.municipio,
      uf: pessoaJuridica.uf,
      cep: pessoaJuridica.cep,
      cnpjResponsavel: pessoaJuridica.cnpjResponsavel,
      fonteDados: pessoaJuridica.fonteDados,
      meiosComunicacao: pessoaJuridica.meiosComunicacao,
      seqAgenteRegulado: pessoaJuridica.seqAgenteRegulado,
      estabelecimentos: pessoaJuridica.estabelecimentos,
      codLocalidade: pessoaJuridica.codLocalidade,
      endMatriz: pessoaJuridica.endMatriz
    };

    console.log('Confronto => ', body);

    return this.http.post<any>(`${this._configService.getConfigObjectKey("apiUrl")}confronto-receita`, body,
    { headers: { 'Content-Type': 'application/json' } }).pipe(take(1));

  }

  confrontar_mock(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/confronto-receita').pipe(take(1));
  }

}
