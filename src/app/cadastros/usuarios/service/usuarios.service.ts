import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../vo/usuario';
import { NgEventBus } from 'ng-event-bus';
import { CadastroService } from '../../abstracts/cadastro-service';

export const BUSCAR_USUARIOS_SUCESSO_EVENT = 'app:buscarUsuariosSucesso';
export const SALVAR_USUARIO_SUCESSO_EVENT = 'app:salvarUsuarioSucesso';
export const EXCLUIR_USUARIO_SUCESSO_EVENT = 'app:excluirUsuarioSucesso';
export const OPERACAO_USUARIO_ERRO_EVENT = 'app:operacaoUsuarioErro';

const API_URL = 'http://localhost:5555/usuario';

@Injectable()
export class UsuariosService implements CadastroService<Usuario> {

  constructor(
    private http: HttpClient,
    private eventBus: NgEventBus) { }

  salvar(usuario: Usuario) {
    let observable;

    if (usuario.id) {
      const url = `${API_URL}/${usuario.id}`;
      observable = this.http.put(url, usuario);
    } else {
      observable = this.http.post(API_URL, usuario);
    }

    observable.subscribe(
      sucesso => this.eventBus.cast(SALVAR_USUARIO_SUCESSO_EVENT, sucesso),
      falha => this.dispararEventoErro(falha)
    );
  }

  excluir(usuarioId: string) {
    this.http.delete(`${API_URL}/${usuarioId}`)
      .subscribe(
        sucesso => this.eventBus.cast(EXCLUIR_USUARIO_SUCESSO_EVENT, sucesso),
        falha => this.dispararEventoErro(falha)
      );
  }

  buscarTodos() {
    this.http.get(API_URL)
      .subscribe(
        response => {
          const listaUsuarios = (response as Usuario[]).map(item => Usuario.criar(item));
          this.eventBus.cast(BUSCAR_USUARIOS_SUCESSO_EVENT, listaUsuarios)
        },
        falha => {
          if ((falha as HttpErrorResponse).status == 400) {
            this.eventBus.cast(BUSCAR_USUARIOS_SUCESSO_EVENT);
            return;
          }

          this.dispararEventoErro(falha);
        }
      );
  }

  private dispararEventoErro(falha: HttpErrorResponse) {
    this.eventBus.cast(OPERACAO_USUARIO_ERRO_EVENT, falha.error.mensagem);
  }
}
