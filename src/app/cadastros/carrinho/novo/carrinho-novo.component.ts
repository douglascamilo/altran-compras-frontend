import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Usuario } from '../../usuarios/vo/usuario';
import { BUSCAR_USUARIOS_SUCESSO_EVENT, UsuariosService } from '../../usuarios/service/usuarios.service';
import { NgEventBus } from 'ng-event-bus';
import { EventBusHelper } from '../../../shared/event-bus/event-bus.helper';
import { CarrinhoService, CRIAR_CARRINHO_SUCESSO } from '../service/carrinho.service';
import { Carrinho } from '../vo/carrinho';
import { Router } from '@angular/router';
import { DadosPaginacao } from '../../abstracts/dados-paginacao';

@Component({
  selector: 'app-carrinho-novo',
  templateUrl: './carrinho-novo.component.html'
})
export class CarrinhoNovoComponent implements OnInit, OnDestroy {
  debounce: Subject<string> = new Subject<string>();
  usuariosEncontrados: Usuario[] = [];
  usuarioSelecionado: Usuario = new Usuario();
  carrinho: Carrinho;
  eventBusHelper = new EventBusHelper();
  dadosPaginacao = new DadosPaginacao<Usuario>();

  constructor(
    private usuarioService: UsuariosService,
    private carrinhoService: CarrinhoService,
    private eventBus: NgEventBus,
    private router: Router) { }

  ngOnInit() {
    this.cadastrarEventBusListeners();
    this.cadastrarEventoBuscaUsuarios();
  }

  ngOnDestroy(): void {
    this.eventBusHelper.descadastrarListeners();
    this.debounce.unsubscribe();
  }

  selecionar(usuario: Usuario) {
    this.usuarioSelecionado.deselecionar();
    this.usuarioSelecionado = usuario;
    this.usuarioSelecionado.selecionar();
  }

  criarOuContinuarCarrinho() {
    this.carrinhoService.buscarCarrinhoEmAberto(this.usuarioSelecionado.id)
      .subscribe(
        () => null,
        () => this.carrinhoService.criar(this.usuarioSelecionado.id)
      );
  }

  listaPaginada() {
    return this.dadosPaginacao.obterDadosPaginados(this.usuariosEncontrados);
  }

  private buscarUsuariosPorFiltro(textoFiltro: string) {
    this.usuarioSelecionado.deselecionar();
    this.usuarioService.buscarPorFiltro(textoFiltro)
  }

  private cadastrarEventBusListeners() {
    let eventBusListeners = [
      this.onBuscarUsuariosSucesso(),
      this.onCriarCarrinhoSucesso()
    ];

    this.eventBusHelper.manterListeners(eventBusListeners);
  }

  private cadastrarEventoBuscaUsuarios() {
    this.debounce
      .pipe(debounceTime(500))
      .subscribe(textoFiltro => this.buscarUsuariosPorFiltro(textoFiltro));
  }

  private onBuscarUsuariosSucesso() {
    return this.eventBus.on(BUSCAR_USUARIOS_SUCESSO_EVENT)
      .subscribe(response => this.usuariosEncontrados = response as Usuario[]);
  }

  private onCriarCarrinhoSucesso() {
    return this.eventBus.on<Carrinho>(CRIAR_CARRINHO_SUCESSO)
      .subscribe(carrinho => this.navegarParaItensCarrinho(carrinho));
  }

  private navegarParaItensCarrinho(carrinho: Carrinho) {
    this.router.navigateByUrl(
      '/carrinho/itens',
      { state: { carrinho } }
    );
  }
}
