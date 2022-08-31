import { TipoMeioComunicacao } from './tipo-meio-comunicacao';
import { Assunto } from "./assunto";

export class MeioDeComunicacao {
  constructor(public seqContatoAgente: number,
              public complementoMeioComunicacao: string,
              public descricaoMeioComunicacao: string,
              public seqAgenteRegulado: string,
              public assunto: Assunto,
              public tipoMeioComunicacao: TipoMeioComunicacao,
              public statusRegistro: string
            ) {}
}
