import { DadosAlerta } from '../../shared/alerta/alerta';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { ActivatedRoute } from '@angular/router';
import { UrlData } from './url-data';

export abstract class AbstractDadosTela {
  dadosAlerta = new DadosAlerta();
  eventos = [];
  formulario: FormGroup;

  iniciarDadosTela(activatedRoute: ActivatedRoute, formBuilder: FormBuilder, eventBus: NgEventBus) {
    this.iniciarItem(activatedRoute);

    this.formulario = this.iniciarForm(formBuilder);
    this.eventos = this.cadastrarEventBusListeners(eventBus);
  }

  iniciarItem(activatedRoute: ActivatedRoute) {
    const urlData: UrlData<any> = JSON.parse(activatedRoute.snapshot.params.data);
    return urlData ? urlData.cadastro : null;
  }

  descadastrarEventBusListeners() {
    this.eventos.forEach(evento => evento.unsubscribe());
  }

  definirMensagemSucesso(timeout?: number) {
    this.dadosAlerta.definirMensagemSucesso().fecharMensagemAutomaticamente(timeout);
  }

  abstract iniciarForm(formBuilder: FormBuilder);
  abstract cadastrarEventBusListeners(eventBus: NgEventBus);
}

