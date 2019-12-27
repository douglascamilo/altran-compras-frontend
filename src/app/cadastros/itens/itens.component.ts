import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { ActivatedRoute, Router } from '@angular/router';
import { EXCLUIR_ITEM_SUCESSO_EVENT, ItemService } from './service/item.service';
import { DadosItem } from './vo/dados-item';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html'
})
export class ItensComponent implements OnInit, OnDestroy {
  dadosItem = new DadosItem();

  constructor(
    private formBuilder: FormBuilder,
    private eventBus: NgEventBus,
    private activatedRoute: ActivatedRoute,
    private service: ItemService,
    private router: Router) { }

  ngOnInit() {
    this.dadosItem.iniciarDadosTela(this.activatedRoute, this.formBuilder, this.eventBus);
    this.cadastrarEventBusListeners();
  }

  ngOnDestroy() {
    this.dadosItem.descadastrarEventBusListeners();
  }

  salvar() {
    const item = this.dadosItem.atualizarItem();
    this.service.salvar(item);
  }

  cancelar() {
    this.voltarNavegacao();
  }

  excluir() {
    const item = this.dadosItem.item;
    this.service.excluir(item.id);
  }

  private cadastrarEventBusListeners() {
    const excluirItemEvent = this.eventBus.on(EXCLUIR_ITEM_SUCESSO_EVENT).subscribe(() => {
      const timeout = 1500;

      this.dadosItem.definirMensagemSucesso(timeout);
      setTimeout(() => this.voltarNavegacao(), timeout);
    });

    this.dadosItem.eventos.push(excluirItemEvent);
  }

  private voltarNavegacao() {
    this.router.navigate(['']);
  }
}
