import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from './service/usuarios.service';
import { DadosUsuario } from './vo/dados-usuario';
import { NgEventBus } from 'ng-event-bus';
import { Usuario } from './vo/usuario';
import { Router } from '@angular/router';
import { UrlData } from '../interfaces/url-data';
import { Cadastro } from '../interfaces/cadastro';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent implements OnInit, OnDestroy {
  dadosUsuario = new DadosUsuario();
  usuarioSelecionado: Usuario = new Usuario();

  constructor(
    private service: UsuariosService,
    private eventBus: NgEventBus,
    private router: Router) { }

  ngOnInit() {
    this.dadosUsuario.cadastrarEventBusListeners(this.eventBus);
    this.buscar();
  }

  ngOnDestroy(): void {
    this.dadosUsuario.descadastrarEventBusListeners();
  }

  private buscar() {
    this.service.buscarTodos();
  }

  selecionarUsuario(usuario: Usuario) {
    this.usuarioSelecionado.deselecionar();
    this.usuarioSelecionado = usuario;
    this.usuarioSelecionado.selecionar();
  }

  cadastrarNovoUsuario() {
    this.navegarFormularioUsuario();
  }

  alterarUsuarioSelecionado() {
    this.navegarFormularioUsuario(new UrlData(this.usuarioSelecionado));
  }

  private navegarFormularioUsuario(urlData?: UrlData<Cadastro>) {
    const urlDataJson = urlData ? JSON.stringify(urlData) : null;

    this.router.navigate(
      ['/usuario/form', { data: urlDataJson}],
      { skipLocationChange: true });
  }
}
