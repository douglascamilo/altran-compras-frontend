import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Item } from '../vo/item';
import { NgEventBus } from 'ng-event-bus';
import { CadastroService } from '../../abstracts/cadastro-service';

export const BUSCAR_ITENS_SUCESSO_EVENT = 'app:buscarItensSucesso';
export const SALVAR_ITEM_SUCESSO_EVENT = 'app:salvarItemSucesso';
export const EXCLUIR_ITEM_SUCESSO_EVENT = 'app:excluirItemSucesso';
export const OPERACAO_ITEM_ERRO_EVENT = 'app:operacaoItemErro';

const API_URL = 'http://localhost:5555/item';

@Injectable()
export class ItemService implements CadastroService<Item> {

  constructor(
    private http: HttpClient,
    private eventBus: NgEventBus) { }

  buscarTodos() {
    this.http.get(API_URL)
      .subscribe(
        response => {
          const listaItens = (response as Item[]).map(item => Item.criar(item));
          this.eventBus.cast(BUSCAR_ITENS_SUCESSO_EVENT, listaItens);
        },
        falha => {
          if ((falha as HttpErrorResponse).status == 400) {
            this.eventBus.cast(BUSCAR_ITENS_SUCESSO_EVENT);
            return;
          }

          this.dispararEventoErro(falha);
        }
      );
  }

  salvar(item: Item) {
    let observable;

    if (item.id) {
      observable = this.http.put(`${API_URL}/${item.id}`, item);
    } else {
      observable = this.http.post(API_URL, item);
    }

    observable.subscribe(
      sucesso => this.eventBus.cast(SALVAR_ITEM_SUCESSO_EVENT, sucesso),
      falha => this.dispararEventoErro(falha)
    );
  }

  excluir(itemId: string) {
    this.http.delete(`${API_URL}/${itemId}`)
      .subscribe(
        sucesso => this.eventBus.cast(EXCLUIR_ITEM_SUCESSO_EVENT, sucesso),
        falha => this.dispararEventoErro(falha)
      );
  }

  private dispararEventoErro(falha: HttpErrorResponse) {
    this.eventBus.cast(OPERACAO_ITEM_ERRO_EVENT, falha.error.mensagem);
  }
}
