import { Item } from './item';
import { AbstractDadosTela } from '../../interfaces/abstract-dados-tela';
import { ActivatedRoute } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { FECHA_MENSAGEM_EVENT } from '../../../shared/alerta/alerta.component';
import { OPERACAO_ITEM_ERRO_EVENT, SALVAR_ITEM_SUCESSO_EVENT } from '../service/item.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AltranValidators } from '../../../shared/validators/altran.validators';

export class DadosItem extends AbstractDadosTela {
  item: Item;

  iniciarItem(activatedRoute: ActivatedRoute): void {
    this.item = super.iniciarItem(activatedRoute) || new Item();
  }

  cadastrarEventBusListeners(eventBus: NgEventBus) {
    const fecharMensagemEvent = eventBus.on(FECHA_MENSAGEM_EVENT).subscribe(() => {
      this.dadosAlerta.limparMensagem();
    });

    const salvarItemEvent = eventBus.on(SALVAR_ITEM_SUCESSO_EVENT).subscribe(() => {
      this.formulario.reset();
      this.dadosAlerta.definirMensagemSucesso().fecharMensagemAutomaticamente();
    });

    const operacaoErroItemEvent = eventBus.on(OPERACAO_ITEM_ERRO_EVENT).subscribe(mensagem => {
      this.dadosAlerta.definirMensagemErro(mensagem as string);
    });

    return [fecharMensagemEvent, salvarItemEvent, operacaoErroItemEvent];
  }

  atualizarItem() {
    this.item.nome = this.formulario.get('nome').value;
    this.item.valor = this.formulario.get('valor').value;

    return this.item;
  }

  iniciarForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      nome: [this.item.nome, Validators.required],
      valor: [this.item.valor, [Validators.required, AltranValidators.menorIgualZero]]
    });
  }
}
