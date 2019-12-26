import { Component, Input } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { DadosAlerta } from './alerta';

export const FECHA_MENSAGEM_EVENT = 'app:fechaMensagem';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html'
})
export class AlertaComponent {
  @Input() dadosAlerta: DadosAlerta;

  constructor(private eventBus: NgEventBus) {}

  fecharMensagem() {
    this.eventBus.cast(FECHA_MENSAGEM_EVENT);
  }
}
