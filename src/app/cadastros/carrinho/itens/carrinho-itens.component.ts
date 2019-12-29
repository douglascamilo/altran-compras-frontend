import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventBusHelper } from '../../../shared/event-bus/event-bus.helper';
import { NgEventBus } from 'ng-event-bus';
import { Carrinho } from '../vo/carrinho';
import { Router } from '@angular/router';
import { Item } from '../../itens/vo/item';
import { DadosPaginacao } from '../../abstracts/dados-paginacao';
import { CarrinhoService } from '../service/carrinho.service';

export const SALVAR_ITEM_CARRINHO_EVENT = 'app:salvarItemCarrinhoEvent';

@Component({
  selector: 'app-carrinho-itens',
  templateUrl: './carrinho-itens.component.html'
})
export class CarrinhoItensComponent implements OnInit, OnDestroy {
  private _exibeConteudo = true;
  private _carrinho: Carrinho;
  private _eventBusHelper = new EventBusHelper();
  private _dadosPaginacao = new DadosPaginacao<Item>();
  private _itemSelecionado = new Item();

  constructor(
    private eventBus: NgEventBus,
    private router: Router,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.carregarParametros();
    this.cadastrarEventBusListeners();
  }

  ngOnDestroy() {
    this._eventBusHelper.descadastrarListeners();
  }

  buscarItens() {
    this.ocultarConteudoTela();
    const carrinho = this._carrinho;

    this.router.navigate(
      ['/carrinho/itens/buscar'],
      {
        state: { carrinhoSelecionado: carrinho }
      }
    );
  }

  listaPaginada() {
    return this._dadosPaginacao.obterDadosPaginados(this._carrinho.itens);
  }

  selecionar(item: Item) {
    this._itemSelecionado.deselecionar();
    this._itemSelecionado = item;
    this._itemSelecionado.selecionar();
  }

  alterarItemSelecionado() {
    const stateObj = this.obterStateIncluir();
    this.ocultarConteudoTela();

    this.router.navigate(
      ['carrinho/itens/incluir'],
      { state: stateObj }
    );
  }

  excluirItemSelecionado() {
    this.carrinhoService.excluirItemSelecionado(this._itemSelecionado.id, this._carrinho)
      .subscribe(() => {
        this._carrinho.remover(this._itemSelecionado.id);
        this._itemSelecionado.deselecionar();
      });
  }

  private cadastrarEventBusListeners() {
    const listeners = [
      this.onSalvarItemCarrinhoEvent()
    ];

    this._eventBusHelper.manterListeners(listeners);
  }

  private onSalvarItemCarrinhoEvent() {
    return this.eventBus.on(SALVAR_ITEM_CARRINHO_EVENT)
      .subscribe(item => this.tratarSalvarItemCarrinho(item as Item));
  }

  private tratarSalvarItemCarrinho(item: Item) {
    this.exibirConteudoTela();
    this._carrinho.adicionar(item);
  }

  private carregarParametros() {
    this._carrinho = Carrinho.parse(history.state.carrinho as Carrinho);
  }

  private ocultarConteudoTela() {
    this._exibeConteudo = false;
    this._itemSelecionado.deselecionar();
  }

  private exibirConteudoTela() {
    this._exibeConteudo = true;
  }

  private obterStateIncluir() {
    return {
      itemSelecionado: this._itemSelecionado,
      carrinhoSelecionado: this._carrinho
    }
  }
}
