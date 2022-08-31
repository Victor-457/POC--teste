import { Qualificacao } from "./qualificacao";

export class TipoInstalacao {
  constructor(
    public codPrefixo: string,
    public codTipoInstalacao: string,
    public dataFimVigencia: string,
    public dataInicioVigencia: string,
    public nomeTipoInstalacao: string,
    public qualificacao?: Qualificacao,
  ) {}
}
