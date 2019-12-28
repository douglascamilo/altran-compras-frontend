import { NgEventBus } from 'ng-event-bus';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro-service';
import { Cadastro } from './cadastro';
import { AbstractDadosTela } from './abstract-dados-tela';
import { OnDestroy, OnInit } from '@angular/core';
import { UrlData } from './url-data';

export abstract class AbstractListComponent<T extends Cadastro> implements OnInit, OnDestroy {
  dadosTela: AbstractDadosTela;
  cadastroSelecionado: T;

  constructor(
    protected service: CadastroService<T>,
    protected eventBus: NgEventBus,
    protected router: Router) {
  }

  ngOnInit(): void {
    this.cadastroSelecionado = this.instanciarCadastroSelecionado();

    this.dadosTela = this.instanciarAbstractDadosTela();
    this.dadosTela.cadastrarEventBusListeners(this.eventBus);

    this.service.buscarTodos();
  }

  ngOnDestroy(): void {
    this.dadosTela.descadastrarEventBusListeners();
  }

  selecionarCadastro(cadastro: T) {
    this.cadastroSelecionado.deselecionar();
    this.cadastroSelecionado = cadastro;
    this.cadastroSelecionado.selecionar();
  }

  novoCadastro() {
    this.navegarFormularioUsuario();
  }

  alterarCadastro() {
    this.navegarFormularioUsuario(new UrlData(this.cadastroSelecionado));
  }

  private navegarFormularioUsuario(urlData?: UrlData<Cadastro>) {
    const urlDataJson = urlData ? JSON.stringify(urlData) : null;
    const urlFormularioCadastro = this.getUrlFormularioCadastro();

    this.router.navigate(
      [urlFormularioCadastro, { data: urlDataJson}],
      { skipLocationChange: true });
  }

  abstract instanciarAbstractDadosTela();
  abstract instanciarCadastroSelecionado();
  abstract getUrlFormularioCadastro(): string;
  abstract getDadosTela();
}
