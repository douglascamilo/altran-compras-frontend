import { AbstractDadosTela } from '../../interfaces/abstract-dados-tela';
import { Usuario } from './usuario';
import { ActivatedRoute } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FECHA_MENSAGEM_EVENT } from '../../../shared/alerta/alerta.component';
import { OPERACAO_USUARIO_ERRO_EVENT, SALVAR_USUARIO_SUCESSO_EVENT } from '../usuarios.service';

export class DadosUsuario extends AbstractDadosTela {
  usuario: Usuario;

  iniciarItem(activatedRoute: ActivatedRoute): void {
    this.usuario = super.iniciarItem(activatedRoute) || new Usuario();
  }

  cadastrarEventBusListeners(eventBus: NgEventBus) {
    const fechaMensagemEvent = eventBus.on(FECHA_MENSAGEM_EVENT).subscribe(() => {
      this.dadosAlerta.limparMensagem();
    });

    const salvarUsuarioEvent = eventBus.on(SALVAR_USUARIO_SUCESSO_EVENT).subscribe(() => {
      this.formulario.reset();
      this.dadosAlerta.definirMensagemSucesso().fecharMensagemAutomaticamente();
    });

    const operacaoUsuarioErroEvent = eventBus.on(OPERACAO_USUARIO_ERRO_EVENT).subscribe(mensagem => {
      this.dadosAlerta.definirMensagemErro(mensagem as string);
    });

    return [ fechaMensagemEvent, salvarUsuarioEvent, operacaoUsuarioErroEvent ];
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
}
