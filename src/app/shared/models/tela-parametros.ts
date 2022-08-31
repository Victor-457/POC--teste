import { AcaoEnum } from "./acao-enum.enum";
import { TelaEstabelecimentoEnum } from "./tela-estabelecimento-enum.enum";

export class TelaParametros {
  constructor(
    public telaEstabelecimentoOrigem?: TelaEstabelecimentoEnum,
    public telaEstabelecimentoDestino?: TelaEstabelecimentoEnum,
    public acaoTelaDestino?: AcaoEnum,
    public acaoTelaOrigem?: AcaoEnum,
    public cnpj?: string,
    public codInstalacao?: string
              ) {}
}
