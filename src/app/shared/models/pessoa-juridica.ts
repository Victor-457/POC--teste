import { Estabelecimento } from "./estabelecimento";
import { MeioDeComunicacao } from "./meio-de-comunicacao";

export class PessoaJuridica {

  constructor(
    public raizCNPJ: string,
    public nomeFantasia: string,
    public nomeEmpresarial: string,
    public endMatriz: string,
    public codLocalidade: string,
    public logradouro: string,
    public numero: string,
    public complemento: string,
    public bairro: string,
    public municipio: string,
    public cep: string,
    public fonteDados: string,
    public cnpjResponsavel: string,
    public seqAgenteRegulado: number,
    public situacaoCadastral: string,
    public dscSituacaoCNPJRFB: string,
    public dhaUltimoAcessoRFB: string,
    public dscMotivoSituacaoCNPJRFB: string,
    public dtSituacaoCNPJRFB: string,
    public uf: string,
    public meiosComunicacao: MeioDeComunicacao[],
    public estabelecimentos: Estabelecimento[],
    ) {}

}
