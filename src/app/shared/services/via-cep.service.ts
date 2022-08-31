import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient,
    private _configService: RuntimeConfigLoaderService) { }

  getByCEP(cep: string): Observable<any> {

    let url = this._configService.getConfigObjectKey("apiViaCEP");
    url = url.replace("{0}", cep);

    return this.http.get<any>(url).pipe(take(1));

  }

}
