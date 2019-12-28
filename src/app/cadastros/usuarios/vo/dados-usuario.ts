import { Usuario } from './usuario';
import { ActivatedRoute } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FECHA_MENSAGEM_EVENT } from '../../../shared/alerta/alerta.component';
import {
  BUSCAR_USUARIOS_SUCESSO_EVENT,
  OPERACAO_USUARIO_ERRO_EVENT,
  SALVAR_USUARIO_SUCESSO_EVENT
} from '../service/usuarios.service';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { AbstractDadosTela } from '../../abstracts/abstract-dados-tela';
import { DadosPaginacao } from '../../abstracts/dados-paginacao';

export class DadosUsuario extends AbstractDadosTela {
  usuario: Usuario;
  dadosPaginacao = new DadosPaginacao<Usuario>();
  private _listaUsuarios: Usuario[] = [];

  iniciarItem(activatedRoute: ActivatedRoute): void {
    this.usuario = super.iniciarItem(activatedRoute) || new Usuario();
  }

  cadastrarEventBusListeners(eventBus: NgEventBus) {
    return [
      this.onFechaMensagemEvent(eventBus),
      this.onSalvarUsuarioEvent(eventBus),
      this.onOperacaoUsuarioErroEvent(eventBus),
      this.onBuscarUsuarioEvent(eventBus)
    ];
  }

  atualizarUsuario() {
    this.usuario.nome = this.formulario.get('nome').value;
    this.usuario.email = this.formulario.get('email').value;

    return this.usuario;
  }

  iniciarForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  totalItens() {
    return this._listaUsuarios.length;
  }

  isAlteracao() {
    return this.usuario.id;
  }

  get listaUsuarios(): Usuario[] {
    return this.dadosPaginacao.obterDadosPaginados(this._listaUsuarios);
  }

  private addUsuarios(usuarios: Usuario[]) {
    if (isNotNullOrUndefined(usuarios)) {
      usuarios.forEach(itemUsuario => this._listaUsuarios.push(itemUsuario));
    }
  }

  private onOperacaoUsuarioErroEvent(eventBus: NgEventBus) {
    return eventBus.on(OPERACAO_USUARIO_ERRO_EVENT).subscribe(mensagem => {
      this.dadosAlerta.definirMensagemErro(mensagem as string);
    });
  }

  private onSalvarUsuarioEvent(eventBus: NgEventBus) {
    return eventBus.on(SALVAR_USUARIO_SUCESSO_EVENT).subscribe(() => {
      if (this.usuario && !this.usuario.id) {
        this.formulario.reset();
      }
      this.dadosAlerta.definirMensagemSucesso().fecharMensagemAutomaticamente();
    });
  }

  private onFechaMensagemEvent(eventBus: NgEventBus) {
    return eventBus.on(FECHA_MENSAGEM_EVENT).subscribe(() => {
      this.dadosAlerta.limparMensagem();
    });
  }

  private onBuscarUsuarioEvent(eventBus: NgEventBus) {
    return eventBus.on(BUSCAR_USUARIOS_SUCESSO_EVENT).subscribe(usuarios => {
      this.addUsuarios(usuarios as Usuario[]);
    });
  }
}
