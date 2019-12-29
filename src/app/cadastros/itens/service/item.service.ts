import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Item } from '../vo/item';
import { NgEventBus } from 'ng-event-bus';
import { CadastroService } from '../../abstracts/cadastro-service';
import { Observable } from 'rxjs';
import { parseHttpResponse } from 'selenium-webdriver/http';

export const BUSCAR_ITENS_SUCESSO_EVENT = 'app:buscarItensSucesso';
export const SALVAR_ITEM_SUCESSO_EVENT = 'app:salvarItemSucesso';
export const EXCLUIR_ITEM_SUCESSO_EVENT = 'app:excluirItemSucesso';
export const OPERACAO_ITEM_ERRO_EVENT = 'app:operacaoItemErro';

const API_URL = 'http://localhost:5555/item';

@Injectable()
export class ItemService implements CadastroService<Item> {

  constructor(
    private _http: HttpClient,
    private _eventBus: NgEventBus) { }

  buscarTodos() {
    this._http.get(API_URL)
      .subscribe(
        response => {
          this.tratarRetornoBuscaItens(response);
        },
        falha => {
          if ((falha as HttpErrorResponse).status == 400) {
            this._eventBus.cast(BUSCAR_ITENS_SUCESSO_EVENT);
            return;
          }

          this.dispararEventoErro(falha);
        }
      );
  }

  salvar(item: Item) {
    let observable;

    if (item.id) {
      observable = this._http.put(`${API_URL}/${item.id}`, item);
    } else {
      observable = this._http.post(API_URL, item);
    }

    observable.subscribe(
      sucesso => this._eventBus.cast(SALVAR_ITEM_SUCESSO_EVENT, sucesso),
      falha => this.dispararEventoErro(falha)
    );
  }

  excluir(itemId: string) {
    this._http.delete(`${API_URL}/${itemId}`)
      .subscribe(
        sucesso => this._eventBus.cast(EXCLUIR_ITEM_SUCESSO_EVENT, sucesso),
        falha => this.dispararEventoErro(falha)
      );
  }

  buscarPorFiltro(filtro: string): Observable<Item[]> {
    return new Observable<Item[]>(
      observer => {
        this._http.get<Item[]>(`${API_URL}/filtro/${filtro}`)
          .subscribe(
            response => {
              const listaItens = this.tratarRetornoBuscaItens(response);
              observer.next(listaItens);
            },
            falha => observer.error(falha)
          );
      }
    );
  }

  private tratarRetornoBuscaItens(response): Item[] {
    const listaItens = (response as Item[]).map(item => Item.parse(item));
    this._eventBus.cast(BUSCAR_ITENS_SUCESSO_EVENT, listaItens);
    return listaItens;
  }

  private dispararEventoErro(falha: HttpErrorResponse) {
    this._eventBus.cast(OPERACAO_ITEM_ERRO_EVENT, falha.error.mensagem);
  }
}
