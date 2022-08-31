import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BehaviorSubjectParam } from '../models/behavior-subject-param';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  cnpjBehaviorSubject: BehaviorSubject<BehaviorSubjectParam>;

  constructor() {

    this.cnpjBehaviorSubject = new BehaviorSubject({cnpj: ''});

  }

  atualizarCNPJ(behaviorSubjectParam: BehaviorSubjectParam) {
    this.cnpjBehaviorSubject.next(behaviorSubjectParam);
  }

}
