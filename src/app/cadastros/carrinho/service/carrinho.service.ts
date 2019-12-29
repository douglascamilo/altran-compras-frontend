import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Carrinho } from '../vo/carrinho';
import { EXIBE_MENSAGEM_EVENT } from '../../../shared/alerta/alerta.component';
import { DadosAlerta } from '../../../shared/alerta/alerta';
import { Observable } from 'rxjs';
import { Item } from '../../itens/vo/item';

const API_URL = 'http://localhost:5555/carrinho';

export const CRIAR_CARRINHO_SUCESSO = 'app:criarOuContinuarCarrinho';

@Injectable()
export class CarrinhoService {

  constructor(
    private http: HttpClient,
    private eventBus: NgEventBus) { }

  buscarCarrinhoEmAberto(usuarioId: string): Observable<Carrinho> {
    const queryParams = new HttpParams()
      .set('usuarioId', usuarioId);

    return new Observable<Carrinho>(observer => {

      this.http.get<Carrinho>(`${API_URL}/buscar`, { params: queryParams })
        .subscribe(
          response => {
            const carrinho = this.tratarEventoCarrinhoSucesso(response);
            observer.next(carrinho);
          },
          falha => observer.error(falha)
        );
      }
    );
  }

  criar(usuarioId: string) {
    const queryParams = new HttpParams()
      .set('usuarioId', usuarioId);

    this.http.post<Carrinho>(`${API_URL}/criar`, null, { params: queryParams })
      .subscribe(
        carrinho => this.tratarEventoCarrinhoSucesso(carrinho),
        falha => {
          const mensagem = (falha as HttpErrorResponse).error.mensagem;
          const dadosAlerta = new DadosAlerta().definirMensagemErro(mensagem);

          this.eventBus.cast(EXIBE_MENSAGEM_EVENT, dadosAlerta);
        });
  }

  gravarItem(item: Item, carrinho: Carrinho) {
    const queryParams = this.obterHttpParams(carrinho);

    return this.http.put(`${API_URL}/gravar-item`, item, { params: queryParams });
  }

  excluirItemSelecionado(itemId: string, carrinho: Carrinho): Observable<void> {
    const httpParams = this.obterHttpParams(carrinho);

    return this.http.delete<void>(`${API_URL}/remover-item/${itemId}`, { params: httpParams })
  }

  private tratarEventoCarrinhoSucesso(response: Carrinho) {
    const carrinho = Carrinho.parse(response);
    this.eventBus.cast(CRIAR_CARRINHO_SUCESSO, carrinho);

    return carrinho;
  }

  private obterHttpParams(carrinho: Carrinho) {
    return new HttpParams()
      .set('carrinhoId', carrinho.id)
      .set('usuarioId', carrinho.usuarioId);
  }
}
