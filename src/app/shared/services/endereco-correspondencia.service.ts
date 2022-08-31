import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoCorrespondenciaService {

  constructor(private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }

  postCEP(cep: string): Observable<any> {

    let body = { cep: cep };

    return this.http.post<any>(`${this._configService.getConfigObjectKey("apiUrl")}consultar-cep`, body,
      { headers: { 'Content-Type': 'application/json' } }).pipe(take(1));

  }

}
