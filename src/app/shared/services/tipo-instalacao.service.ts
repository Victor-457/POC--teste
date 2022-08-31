import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoInstalacaoService {

  constructor(private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this._configService.getConfigObjectKey("apiUrl")}tipo-instalacao`).pipe(take(1));
  }

}
