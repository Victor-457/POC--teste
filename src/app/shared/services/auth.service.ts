import { Constants } from 'src/app/core/constants';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocalStorageKeys } from 'src/app/core/constantes/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }


  autenticar(cnpj: string, password: string): Observable<any> {

    let body = { cnpj: cnpj, senha: password };

    return this.http.post<any>(`${this._configService.getConfigObjectKey("apiUrl")}autenticar-usuario`, body,
      { headers: { 'Content-Type': 'application/json' } }).pipe(take(1));

  }

  estaLogado(): boolean {
    let logged: string = localStorage.getItem(LocalStorageKeys.Logged);
    return (logged == Constants.VERDADEIRO);
  }

  logoff() {
    localStorage.removeItem(LocalStorageKeys.Logged);
    localStorage.removeItem(LocalStorageKeys.NomeFuncionario);
    localStorage.removeItem(LocalStorageKeys.RaizCNPJ);
    localStorage.removeItem(LocalStorageKeys.FinalidadeSIMP);
    localStorage.removeItem(LocalStorageKeys.Identificacao);
    localStorage.removeItem(LocalStorageKeys.MeiosDeComunicacao);
    localStorage.removeItem(LocalStorageKeys.EnderecoCorrespondencia);
    localStorage.removeItem(LocalStorageKeys.FonteDados);
    localStorage.removeItem(LocalStorageKeys.NovoEstabelecimento);
    localStorage.removeItem(LocalStorageKeys.EnderecoMatriz);
    localStorage.removeItem(LocalStorageKeys.PessoaJuridica);
    localStorage.removeItem(LocalStorageKeys.NomeEmpresarial);
    localStorage.removeItem(LocalStorageKeys.EstabelecimentoObtidoNaRFB);
    localStorage.removeItem(LocalStorageKeys.EstabelecimentoSelecionado);
    localStorage.removeItem(LocalStorageKeys.DadosPendentesSalvamento);
  }

}
