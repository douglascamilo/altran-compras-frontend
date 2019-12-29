import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ItemService } from '../../itens/service/item.service';
import { DadosPaginacao } from '../../abstracts/dados-paginacao';
import { Item } from '../../itens/vo/item';

@Component({
  selector: 'app-carrinhos-itens-buscar',
  templateUrl: './carrinho-itens-buscar.component.html'
})
export class CarrinhoItensBuscarComponent implements OnInit, OnDestroy {
  debounce: Subject<string> = new Subject<string>();
  dadosPaginacao = new DadosPaginacao<Item>();
  itensEncontrados: Item[] = [];
  itemSelecionado = new Item();

  constructor(
    private _router: Router,
    private _itemService: ItemService) {
  }

  ngOnInit() {
    this.cadastrarEventoBuscaItens();
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  listaPaginada(): Item[] {
    return this.dadosPaginacao.obterDadosPaginados(this.itensEncontrados);
  }

  selecionar(item: Item) {
    this.itemSelecionado.deselecionar();
    this.itemSelecionado = item;
    this.itemSelecionado.selecionar();
  }

  configurarQuantidadeItemSelecionado() {
    const item = this.itemSelecionado;

    this._router.navigate(
      ['/carrinho/itens/incluir'],
      {
        state: {
          itemSelecionado: item,
          carrinhoSelecionado: history.state.carrinhoSelecionado
        }
      });
  }

  private cadastrarEventoBuscaItens() {
    this.debounce
      .pipe(debounceTime(500))
      .subscribe(textoFiltro => this.buscarItensPorFiltro(textoFiltro));
  }

  private buscarItensPorFiltro(filtro: string) {
    if (!filtro) {
      return;
    }

    this.itemSelecionado.deselecionar();
    this._itemService.buscarPorFiltro(filtro)
      .subscribe(listaItens => this.itensEncontrados = listaItens);
  }
}
