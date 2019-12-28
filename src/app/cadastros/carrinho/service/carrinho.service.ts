import { Injectable } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Carrinho } from '../vo/carrinho';
import { EXIBE_MENSAGEM_EVENT } from '../../../shared/alerta/alerta.component';
import { DadosAlerta } from '../../../shared/alerta/alerta';
import { Observable, Subject } from 'rxjs';

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
          carrinho => {
            this.emitirEventoCarrinhoSucesso(carrinho);
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
        carrinho => this.emitirEventoCarrinhoSucesso(carrinho),
        falha => {
          const mensagem = (falha as HttpErrorResponse).error.mensagem;
          const dadosAlerta = new DadosAlerta().definirMensagemErro(mensagem);

          this.eventBus.cast(EXIBE_MENSAGEM_EVENT, dadosAlerta);
        });
  }

  private emitirEventoCarrinhoSucesso(carrinho: Carrinho) {
    this.eventBus.cast(CRIAR_CARRINHO_SUCESSO, carrinho);
  }
}
