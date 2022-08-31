import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient,
              private _configService: RuntimeConfigLoaderService) { }

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this._configService.getConfigObjectKey("apiUrl")}tipo-meio-comunicacao`).pipe(take(1));
  }


}
