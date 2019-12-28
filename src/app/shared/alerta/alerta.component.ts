import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DadosAlerta } from './alerta';
import { EventBusHelper } from '../event-bus/event-bus.helper';

export const FECHA_MENSAGEM_EVENT = 'app:fechaMensagemEvent';
export const EXIBE_MENSAGEM_EVENT = 'app:exibeMensagemEvent';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html'
})
export class AlertaComponent implements OnInit, OnDestroy {
  @Input() dadosAlerta: DadosAlerta;
  eventBusHelper = new EventBusHelper();

  constructor(
    private eventBus: NgEventBus) {}

  ngOnInit() {
    this.dadosAlerta = this.dadosAlerta || new DadosAlerta();
    this.cadastrarEventBusListeners();
  }

  ngOnDestroy() {
    this.eventBusHelper.descadastrarListeners();
  }

  fecharMensagem() {
    this.dadosAlerta.limparMensagem();
    this.eventBus.cast(FECHA_MENSAGEM_EVENT, this.dadosAlerta);
  }

  private cadastrarEventBusListeners() {
    const listeners = [
      this.onExibeMensagemEvent()
    ];

    this.eventBusHelper.manterListeners(listeners);
  }

  private onExibeMensagemEvent() {
    return this.eventBus.on(EXIBE_MENSAGEM_EVENT)
      .subscribe(dadosAlerta => this.dadosAlerta = dadosAlerta as DadosAlerta);
  }
}
