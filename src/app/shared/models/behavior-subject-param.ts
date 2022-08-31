import { AcaoEnum } from "./acao-enum.enum";

export class BehaviorSubjectParam {
  constructor(
    public cnpj: string,
    public acao?: AcaoEnum) {}
}
