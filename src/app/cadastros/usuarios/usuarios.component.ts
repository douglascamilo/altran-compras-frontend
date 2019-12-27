import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EXCLUIR_USUARIO_SUCESSO_EVENT, UsuariosService } from './usuarios.service';
import { NgEventBus } from 'ng-event-bus';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosUsuario } from './vo/dados-usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [ UsuariosService ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  dadosUsuario = new DadosUsuario();

  constructor(
    private formBuilder: FormBuilder,
    private service: UsuariosService,
    private eventBus: NgEventBus,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.iniciarFormulario();
    this.cadastrarEventBusListeners();
  }

  ngOnDestroy() {
    this.dadosUsuario.descadastrarEventBusListeners();
  }

  private iniciarFormulario() {
    this.dadosUsuario.iniciarDadosTela(this.activatedRoute, this.formBuilder, this.eventBus);
  }

  salvar() {
    const usuario = this.dadosUsuario.atualizarUsuario();
    this.service.salvar(usuario);
  }

  cancelar() {
    this.voltarNavegacao();
  }

  excluir() {
    const usuario = this.dadosUsuario.usuario;
    this.service.excluir(usuario.id);
  }

  private voltarNavegacao() {
    this.router.navigate(['']);
  }

  private cadastrarEventBusListeners() {
    const excluirItemEvent = this.eventBus.on(EXCLUIR_USUARIO_SUCESSO_EVENT).subscribe(() => {
      const timeout = 1500;
      this.dadosUsuario.definirMensagemSucesso(timeout);

      setTimeout(() => this.voltarNavegacao(), timeout);
    });

    this.dadosUsuario.eventos.push(excluirItemEvent);
  }
}
