import { TelaEstabelecimentoEnum } from './../models/tela-estabelecimento-enum.enum';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { TelaParametros } from '../models/tela-parametros';

@Injectable({
  providedIn: 'root'
})
export class TelaService {

  private tela$: BehaviorSubject<TelaParametros>;
  private parametros$: BehaviorSubject<TelaParametros>;
  // private erro$: BehaviorSubject<string>;

  constructor() {
    let telaParametros: TelaParametros = {};
    this.tela$ = new BehaviorSubject(telaParametros);
    this.parametros$ = new BehaviorSubject(telaParametros);
    // this.erro$ = new BehaviorSubject(null);
  }

  mostrar(telaParametros: TelaParametros) {
    this.tela$.next(telaParametros);
  }

  getTela() {
    return this.tela$.asObservable();
  }

  sendParameter(telaParametros: TelaParametros) {
    this.parametros$.next(telaParametros);
  }

  receiveParameter() {
    return this.parametros$.asObservable();
  }

  // sendErro(message: string) {
  //   this.erro$.next(message);
  // }

  // receiveErro() {
  //   return this.erro$.asObservable();
  // }

}
