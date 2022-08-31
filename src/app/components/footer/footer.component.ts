import { EventService } from './../../shared/services/event.service';
import { Component, OnInit } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';
import { ModoDeUsoEnum } from 'src/app/shared/models/modo-de-uso-enum.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  hoje = new Date();
  versaoSistema: string;
  opcaoDeUso: string;
  nomeAmbiente: string;

  constructor(private _configService: RuntimeConfigLoaderService) { }

  ngOnInit() {

    this.onDefinirNomeAmbiente();

    this.versaoSistema = this._configService.getConfigObjectKey("versaoSistema")

    EventService.opcaoDeUsoInformada.subscribe(opcao => {
      this.opcaoDeUso = opcao;
    });
    localStorage.setItem("ModoDeUso", document.getElementById("modoDeUso").innerText)

  }

  onDefinirNomeAmbiente(){

    this.nomeAmbiente = this._configService.getConfigObjectKey("nomeAmbiente")

  }

}
