import { Qualificacao } from './../../shared/models/qualificacao';
import { Component, OnInit } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { SolicitacaoService } from 'src/app/shared/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.css']
})
export class IdentificacaoComponent implements OnInit {

  listaAtividadeRegulada: any = []
  listaQualificacoes:any =[]
  listaProdutoPai: any = []
  listaProduto: any = []
  listaSolicitacoes: any = []
  pesquisa: string = ""
  filtrosAplicados: any = {"id": -1,"nome":"", "idPai":""}
  pesquisaRealizada: string = ""
  qualificacaoSelecionada: any = {"id": -1, "nome": "", "cod_atividade_perfil": -1}
  atividadeReguladaSelecionada: any = {"id": -1, "nome": "", "indativo": "n"}
  accordionAtividadeReguladaAberto: boolean = false;
  accordionProdutoAberto: boolean = false;
  caminhoAcordion: any[] = [];
  qualificacoesDisponiveis = false
  accordionProdutoPaiAberto: any;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="icon-arrow-left" style="float:left;"></i>', '<i class="icon-arrow-right" style="float:left;"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private _solicitacaoService: SolicitacaoService) {}

  async ngOnInit() {
    this._solicitacaoService.getAtividadeRegulada().subscribe(obj=>this.listaAtividadeRegulada = obj)
    this._solicitacaoService.getProdutoPai().subscribe(obj=>this.listaProdutoPai = obj)
    this._solicitacaoService.getProduto().subscribe(obj=>this.listaProduto = obj)
    this.listaSolicitacoes = await (this._solicitacaoService.getPerfilSolicitacao())
    this.listaQualificacoes = this.listaQualificacoes.concat(await (this._solicitacaoService.getQualificacao()))
  }

  async recuperarProdutoXQUalificacao(id: any): Promise<any>{
    return await this._solicitacaoService.getProdutoXQualificacao(id).toPromise()
  }

  async mostrarSolicitacoesProdutoPai(produto: any){

    let produtosFilhos = this.encontrarProdutos(produto.id)

    produtosFilhos.forEach(async x =>{
      this.pesquisar()
      let produtoXperfis = await this.recuperarProdutoXQUalificacao(x.id);
      let perfisSolicitados = produtoXperfis.map(x => x.idPerfilSolicitacao)
      this.listaSolicitacoes = this.listaSolicitacoes.filter(x => perfisSolicitados.indexOf(x.id.toString()) > -1)
    })
  }

  mostrarQualificacoesDisponiveis(){

    this.qualificacoesDisponiveis = true
    let qualificacoesDisponiveis = this.listaSolicitacoes.map(x => x.idQualificacao)
    this._solicitacaoService.getQualificacao().then((obj:any )=> this.listaQualificacoes = obj.filter(x => qualificacoesDisponiveis.indexOf(x.id.toString()) > -1))
  }

  async clicouAtividade(atividadeRegulada){
    this.filtrosAplicados = {"id": -1,"nome":"", "idPai":""}
    this.qualificacaoSelecionada = {"id": -1, "nome": "", "cod_atividade_perfil": -1}
    this.pesquisar();
    this.atividadeReguladaSelecionada = atividadeRegulada
    let qualificacoes: any = await this._solicitacaoService.getQualificacao()
    let qualificacoesSelecionadas = qualificacoes.filter(x => x.cod_atividade_perfil == atividadeRegulada.id)
    let qualificacoesXatividade = qualificacoesSelecionadas.map(x => x.id)
    this.listaSolicitacoes = this.listaSolicitacoes.filter(x => qualificacoesXatividade.indexOf(Number(x.idQualificacao)) > -1)

    this.mostrarQualificacoesDisponiveis();
  }

  async clicouProduto(produto: any){
    this.atividadeReguladaSelecionada = {"id": -1, "nome": "", "indativo": "n"}

    await this.mostrarSolicitacoesProduto(produto);
    await this.mostrarQualificacoesDisponiveis();
  }

  async clicouQualificacao(qualificacao: any){
    await this.pesquisar();
    this.qualificacaoSelecionada = qualificacao;
    let result = this.listaSolicitacoes.filter(x => x.idQualificacao == qualificacao.id)
    this.listaSolicitacoes = result
  }

  async mostrarSolicitacoesProduto(produto: any){
    this.pesquisar();
    this.filtrosAplicados = produto

    let produtoXqualificacao = await this.recuperarProdutoXQUalificacao(produto.id)

    let qualificacoes = produtoXqualificacao.map(x=>x.cod_qualificacao);

    this.listaSolicitacoes = this.listaSolicitacoes.filter(x => qualificacoes.indexOf(Number(x.idQualificacao)) > -1 )
  }

  async mostrarSolicitacoesPorProdutoGrupo(idProdutoPai: any, nivel: string){
    this.pesquisar();
    this.filtrosAplicados = {"id": -1,"nome":"", "idPai":""}
    this.qualificacaoSelecionada = {"id": -1, "nome": "", "cod_atividade_perfil": -1}
    this.atividadeReguladaSelecionada = {"id": -1, "nome": "", "indativo": "n"}
    let produtosFilhos = await this._solicitacaoService.getProdutoPorIdPai(idProdutoPai);
    let produtoXQualificacao = await (this._solicitacaoService.getProdutoXQualificacaoAll())

    let produtosFinais:any[] = [];
    for(var a = 0; a < produtosFilhos.length; a++){
      let produtosFilhosNv = await this._solicitacaoService.getProdutoPorIdPai(produtosFilhos[a].id);
      if(produtosFilhosNv && produtosFilhosNv.length > 0){
        for(var b = 0; b < produtosFilhosNv.length; b++){
          let produtosFilhosNv2 = await this._solicitacaoService.getProdutoPorIdPai(produtosFilhosNv[b].id);
          if(produtosFilhosNv2 && produtosFilhosNv2.length > 0){
             alert("faltou um nível");
          }
          else{
            produtosFinais.push(produtosFilhosNv[b].id);
          }
        }
      }
      else{
        produtosFinais.push(produtosFilhos[a].id);
      }
    }
    let produtosQualificaoPorProdutos = produtoXQualificacao.filter(x=> produtosFinais.indexOf(x.cod_produto_perfil) > -1);

    this.listaSolicitacoes = this.listaSolicitacoes.filter(x => (produtosQualificaoPorProdutos.map(i=>i.cod_qualificacao)).indexOf(Number(x.idQualificacao)) > -1 );
    this.mostrarQualificacoesDisponiveis();
  }

  encontrarProdutos(id: any): any[] {
    let lst = this.listaProduto.filter(x => x.idPai == id)
    return lst;
  }


  async pesquisar(){
    this.pesquisaRealizada = this.pesquisa
    if(this.pesquisa){
      this.listaSolicitacoes  = this.listaSolicitacoes.filter(x=> x.nome.toUpperCase().includes(this.pesquisa.toUpperCase()))
    }
    else{
      this.listaSolicitacoes = await (this._solicitacaoService.getPerfilSolicitacao());
    }
  }

  async removerFiltro(filtro: string){

    this.qualificacoesDisponiveis = false
    if(filtro == "atividadeRegulada"){
      this.atividadeReguladaSelecionada = {"id": -1, "nome": "", "indativo": "n"}
      this.pesquisar()
    }
    if(filtro == "produto"){
      this.filtrosAplicados = {"id": -1,"nome":"", "idPai":""}
      this.qualificacaoSelecionada = {"id": -1, "nome": "", "cod_atividade_perfil": -1}
      this.pesquisar()
    }
    else if(filtro == "qualificacao"){
      this.qualificacaoSelecionada = {"id": -1, "nome": "", "cod_atividade_perfil": -1}

      if(this.atividadeReguladaSelecionada.id != -1)
        this.clicouAtividade(this.atividadeReguladaSelecionada)
      else if(this.filtrosAplicados.id != -1)
        this.clicouProduto(this.filtrosAplicados)
      else
        this.pesquisar()
    }

    else if(filtro == "pesquisa"){
      this.pesquisa  = ""
      this.pesquisaRealizada  = ""

      if(this.filtrosAplicados.id == -1)
        this.listaSolicitacoes = await (this._solicitacaoService.getPerfilSolicitacao())
      else
        await this.mostrarSolicitacoesProduto(this.filtrosAplicados)
    }
  }

  aberturaAccordionAtividadeRegulada(event: boolean){
    this.accordionAtividadeReguladaAberto = event
  }
  aberturaAccordionProduto(event: boolean){
    this.accordionProdutoAberto = event
  }

  AcordionExpandido(nivel:string, idProduto:any) : boolean{
     if(this.caminhoAcordion.length == 0) return false;

    if(nivel == "1") {
      if(this.caminhoAcordion.length > 0 && this.caminhoAcordion[0] == idProduto) return true;
    }

    if(nivel == "2"){
       if(this.caminhoAcordion.length > 1 && this.caminhoAcordion[1] == idProduto) return true;
      }

    return false;
  }


  montandoCaminhoAcordion(idProduto:any, nivel:string){
    let remotandoCaminho = [];

    if(nivel == "1") {
      if(this.caminhoAcordion.length == 0 || this.caminhoAcordion[0] !== idProduto){
        remotandoCaminho.push(idProduto);
        this.mostrarSolicitacoesPorProdutoGrupo(idProduto, "");
      }
    }

    if(nivel == "2"){
      remotandoCaminho.push(this.caminhoAcordion[0]);
      if(this.caminhoAcordion.length == 1 || this.caminhoAcordion[1] !== idProduto){
          remotandoCaminho.push(idProduto);
          this.mostrarSolicitacoesPorProdutoGrupo(idProduto, "");
       }
      }
      this.caminhoAcordion = remotandoCaminho;
  }


}
