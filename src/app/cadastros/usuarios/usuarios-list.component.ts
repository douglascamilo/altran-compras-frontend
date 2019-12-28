import { Component } from '@angular/core';
import { UsuariosService } from './service/usuarios.service';
import { NgEventBus } from 'ng-event-bus';
import { Usuario } from './vo/usuario';
import { Router } from '@angular/router';
import { AbstractListComponent } from '../abstracts/abstract-list-component';
import { DadosUsuario } from './vo/dados-usuario';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent extends AbstractListComponent<Usuario> {

  constructor(
    service: UsuariosService,
    eventBus: NgEventBus,
    router: Router) {

    super(service, eventBus, router);
  }

  instanciarAbstractDadosTela() {
    return new DadosUsuario();
  }

  instanciarCadastroSelecionado() {
    return new Usuario();
  }

  getUrlFormularioCadastro(): string {
    return '/usuario/form';
  }

  getDadosTela() {
    return (this.dadosTela as DadosUsuario);
  }
}
