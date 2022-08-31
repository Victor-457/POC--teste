import { Instalacao } from "./Instalacao";

export class Estabelecimento {
  constructor(
    public seqEstabelecimento: string,
    public codLocalidade: string,
    public dscEndereco: string,
    public indAtivo: string,
    public indMatriz: string,
    public bairro: string,
    public municipio: string,
    public uf: string,
    public cep: string,
    public cnpj: string,
    public dscSituacaoCNPJRFB: string,
    public statusRegistro: string,
    public dhaUltimoAcessoRFB: string,
    public dscMotivoSituacaoCNPJRFB: string,
    public dtSituacaoCNPJRFB: string,
    public dscComplemento?: string,
    public titulo?: string,
    public numEndereco?: string,
    public observacao?: string,
    public instalacoes?: Instalacao[],
    public seqAgenteRegulado?: string
  ) {}
}
