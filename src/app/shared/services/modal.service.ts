import { ModalConfirmacaoComponent } from './../../components/modal-confirmacao/modal-confirmacao.component';
import { ModalHelpComponent } from './../../components/modal-help/modal-help.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private bsModalService: BsModalService) { }

  show(titulo: string, conteudo: string) {

    const bsModalRef: BsModalRef = this.bsModalService.show(ModalHelpComponent);
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.corpo = conteudo;
  }

  showConfirmacao(titulo: string, conteudo: string, buttonOkText?: string, buttonCancelText?: string) {

    const bsModalRef: BsModalRef = this.bsModalService.show(ModalConfirmacaoComponent);
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.corpo = conteudo;
    if(buttonOkText) bsModalRef.content.buttonOkText = buttonOkText;
    if(buttonCancelText) bsModalRef.content.buttonCancelText = buttonCancelText;

    return (<ModalConfirmacaoComponent>bsModalRef.content).confirmResult;
  }

  showAlerta(titulo: string, conteudo: string, buttonOkText?: string) {

    const bsModalRef: BsModalRef = this.bsModalService.show(ModalAlertComponent);
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.corpo = conteudo;
    if(buttonOkText) bsModalRef.content.buttonOkText = buttonOkText;

    return (<ModalAlertComponent>bsModalRef.content).confirmResult;
  }

}
