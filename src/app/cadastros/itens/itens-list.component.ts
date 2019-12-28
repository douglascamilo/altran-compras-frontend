import { Component, OnDestroy, OnInit } from '@angular/core';
import { DadosItem } from './vo/dados-item';
import { Item } from './vo/item';
import { ItemService } from './service/item.service';
import { NgEventBus } from 'ng-event-bus';
import { Router } from '@angular/router';
import { AbstractListComponent } from '../abstracts/abstract-list-component';
import { Usuario } from '../usuarios/vo/usuario';

@Component({
  selector: 'app-itens-list',
  templateUrl: './itens-list.component.html'
})
export class ItensListComponent extends AbstractListComponent<Item> {

  constructor(
    service: ItemService,
    eventBus: NgEventBus,
    router: Router) {

    super(service, eventBus, router);
  }

  getDadosTela() {
    return (this.dadosTela as DadosItem);
  }

  getUrlFormularioCadastro(): string {
    return "/itens/form";
  }

  instanciarAbstractDadosTela() {
    return new DadosItem();
  }

  instanciarCadastroSelecionado() {
    return new Item();
  }
}
