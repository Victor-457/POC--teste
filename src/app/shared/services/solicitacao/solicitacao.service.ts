import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  constructor(private http: HttpClient) { }

  getAtividadeRegulada(){
    return this.http.get("http://localhost:3000/atividadeRegulada");
  }
  getProduto(){
    return this.http.get("http://localhost:3000/produto");
  }
  getProdutoPorIdPai(idProdutoPai: any) : Promise<any> {
    return this.http.get("http://localhost:3000/produto?idPai="+idProdutoPai).toPromise();
  }
  getProdutoPai(){
    return this.http.get("http://localhost:3000/produto?idPai");
  }

  getProdutoXQualificacao(idProduto: string){
    return this.http.get("http://localhost:3000/qualificacao_produto?cod_produto_perfil="+idProduto);
  }
  getProdutoXQualificacaoAll() : Promise<any>{
    return this.http.get("http://localhost:3000/qualificacao_produto").toPromise();
  }

  getPerfilSolicitacao(): Promise<any>{
        return this.http.get("http://localhost:3000/perfilSolicitacao").toPromise()
  }

  pesquisaPerfilSolicitacao(pesquisa: string): Promise<any>{
    return this.http.get("http://localhost:3000/perfilSolicitacao?nome_like=" + pesquisa).toPromise()
  }
  getQualificacao(){
    return this.http.get("http://localhost:3000/qualificacao").toPromise();
  }
}
