export class MeioComunicacaoViewModel {
  constructor(public seqContatoAgente: number,
              public seqAgenteRegulado: string,
              public id: number,
              public descricaoAssunto: string,
              public codTipoMeioComunicacao: string,
              public descTipoMeioComunicacao: string,
              public descricaoMeioComunicacao: string,
              public complementoMeioComunicacao: string,
              public statusRegistro: string) {}
}
