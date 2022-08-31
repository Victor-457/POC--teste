import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let _token = localStorage.getItem("id_token") ? localStorage.getItem("id_token") : null;

    const reqClone = req.clone({
      headers: req.headers.set('Authorization', _token ? `Bearer ${_token}` : '')
    });

    return next.handle(reqClone);

  }

}
