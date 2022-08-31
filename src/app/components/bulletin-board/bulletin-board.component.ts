import { Component, OnInit } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'bulletinBoard',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {
  mensagem: string = "";

  constructor(private _configService: RuntimeConfigLoaderService) { }

  ngOnInit() {
    EventService.salvouLocalmente.subscribe(
      mensagem=>{
        this.exibirMensagem(mensagem);
      }
    );
  }

  exibirMensagem(mensagem){

    let intervaloMensagem = parseInt(this._configService.getConfigObjectKey("intervaloMensagem"))*1000;
    this.mensagem = mensagem;

    setTimeout(()=>{
      this.mensagem = '';
    }, intervaloMensagem);
  }

}
