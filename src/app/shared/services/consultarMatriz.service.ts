import { Constants } from 'src/app/core/constants';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocalStorageKeys } from 'src/app/core/constantes/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class ConsultarMatriz {

  constructor(private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }


  consultarCnpjMatriz(cnpj: string): Observable<any> {

    let body = { cnpj: cnpj };

    return this.http.post<any>(`${this._configService.getConfigObjectKey("apiUrl")}cnpj-matriz`, body,
      { headers: { 'Content-Type': 'application/json' } }).pipe(take(1));

  }


}
