import { DadosAlerta } from '../../shared/alerta/alerta';
import { FluxoExecucaoEnum } from '../../shared/enums/fluxo-execucao.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { ActivatedRoute } from '@angular/router';

export abstract class AbstractDadosTela {
  dadosAlerta = new DadosAlerta();
  eventos = [];
  fluxoExecucao: FluxoExecucaoEnum;
  formulario: FormGroup;

  iniciarDadosTela(activatedRoute: ActivatedRoute, formBuilder: FormBuilder, eventBus: NgEventBus) {
    this.iniciarItem(activatedRoute);

    this.formulario = this.iniciarForm(formBuilder);
    this.eventos = this.cadastrarEventBusListeners(eventBus);
  }

  iniciarItem(activatedRoute: ActivatedRoute) {
    this.fluxoExecucao = activatedRoute.snapshot.data['fluxoExecucao'] || FluxoExecucaoEnum.INCLUSAO;
    return activatedRoute.snapshot.data['cadastro'];
  }

  descadastrarEventBusListeners() {
    this.eventos.forEach(evento => evento.unsubscribe());
  }

  isNotExclusao() {
    return !this.isExclusao();
  }

  isExclusao() {
    return this.fluxoExecucao == FluxoExecucaoEnum.EXCLUSAO;
  }

  definirMensagemSucesso(timeout?: number) {
    this.dadosAlerta.definirMensagemSucesso().fecharMensagemAutomaticamente(timeout);
  }

  abstract iniciarForm(formBuilder: FormBuilder);
  abstract cadastrarEventBusListeners(eventBus: NgEventBus);
}

