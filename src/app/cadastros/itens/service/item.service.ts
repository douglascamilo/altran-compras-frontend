import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../vo/item';
import { NgEventBus } from 'ng-event-bus';

export const SALVAR_ITEM_SUCESSO_EVENT = 'app:salvarItemSucesso';
export const EXCLUIR_ITEM_SUCESSO_EVENT = 'app:excluirItemSucesso';
export const OPERACAO_ITEM_ERRO_EVENT = 'app:operacaoItemErro';

const API_URL = 'http://localhost:5555/item';

@Injectable()
export class ItemService {

  constructor(
    private http: HttpClient,
    private eventBus: NgEventBus) { }

  salvar(item: Item) {
    let observable;

    if (item.id) {
      observable = this.http.put(`${API_URL}/${item.id}`, item);
    } else {
      observable = this.http.post(API_URL, item);
    }

    observable.subscribe(
      sucesso => this.eventBus.cast(SALVAR_ITEM_SUCESSO_EVENT, sucesso),
      falha => this.eventBus.cast(OPERACAO_ITEM_ERRO_EVENT, falha.error.mensagem)
    );
  }

  excluir(itemId: string) {
    this.http.delete(`${API_URL}/${itemId}`)
      .subscribe(
        sucesso => this.eventBus.cast(EXCLUIR_ITEM_SUCESSO_EVENT, sucesso),
        falha => this.eventBus.cast(OPERACAO_ITEM_ERRO_EVENT, falha.error.mensagem)
      );
  }
}
