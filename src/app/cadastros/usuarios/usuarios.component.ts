import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './usuario';
import { UsuariosService } from './usuarios.service';
import { FECHA_MENSAGEM_EVENT } from '../../shared/alerta/alerta.component';
import { DadosAlerta } from '../../shared/alerta/alerta';
import { NgEventBus } from 'ng-event-bus';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [ UsuariosService ]
})
export class UsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  dadosAlerta = new DadosAlerta();
  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private service: UsuariosService,
    private eventBus: NgEventBus,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.iniciarUsuario();
    this.iniciarForm();
    this.definirEventoLimparMensagem();
  }

  private iniciarUsuario() {
    this.usuario = this.activatedRoute.snapshot.data['usuario'] || new Usuario();
  }

  salvar() {
    this.usuario.nome = this.usuarioForm.get('nome').value;
    this.usuario.email = this.usuarioForm.get('email').value;

    this.service.salvar(this.usuario)
      .subscribe(
        () =>
          this.dadosAlerta
            .definirMensagemSucesso()
            .fecharMensagemAutomaticamente(),
        falha => this.dadosAlerta.definirMensagemErro(falha.error.mensagem)
      );
  }

  private iniciarForm() {
    this.usuarioForm = this.formBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  private definirEventoLimparMensagem() {
    this.eventBus.on(FECHA_MENSAGEM_EVENT).subscribe(() => {
      this.dadosAlerta.limparMensagem();
    });
  }
}
