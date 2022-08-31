import { TipoInstalacao } from "./tipo-instalacao";

export class Instalacao {
  constructor(
    public codInstalacao: string,
    public indAtivo: string,
    public nomeInstalacao: string,
    public statusRegistro: string,
    public seqInstalacao: number,
    public seqEstabelecimento: number,
    public tipoInstalacao?: TipoInstalacao,
  ) {}
}
