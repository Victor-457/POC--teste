import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  constructor(private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this._configService.getConfigObjectKey("apiUrl")}assunto`).pipe(take(1));
  }

}
