import { Item } from './item';
import { AbstractDadosTela } from '../../abstracts/abstract-dados-tela';
import { ActivatedRoute } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { FECHA_MENSAGEM_EVENT } from '../../../shared/alerta/alerta.component';
import {
  BUSCAR_ITENS_SUCESSO_EVENT,
  OPERACAO_ITEM_ERRO_EVENT,
  SALVAR_ITEM_SUCESSO_EVENT
} from '../service/item.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AltranValidators } from '../../../shared/validators/altran.validators';
import { DadosPaginacao } from '../../abstracts/dados-paginacao';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';

export class DadosItem extends AbstractDadosTela {
  item: Item;
  dadosPaginacao = new DadosPaginacao<Item>();
  private _listaItens: Item[] = [];

  iniciarItem(activatedRoute: ActivatedRoute): void {
    this.item = super.iniciarItem(activatedRoute) || new Item();
  }

  cadastrarEventBusListeners(eventBus: NgEventBus) {
    return [
      this.onFechaMensagemEvent(eventBus),
      this.onSalvarItemEvent(eventBus),
      this.onOperacaoErroItemEvent(eventBus),
      this.onBuscarItemEvent(eventBus),
    ];
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

  totalItens() {
    return this._listaItens.length;
  }

  isAlteracao() {
    return this.item.id;
  }

  get listaItens(): Item[] {
    return this.dadosPaginacao.obterDadosPaginados(this._listaItens);
  }

  private addItens(itens: Item[]) {
    if (isNotNullOrUndefined(itens)) {
      itens.forEach(item => this._listaItens.push(item));
    }
  }

  private onOperacaoErroItemEvent(eventBus: NgEventBus) {
    return eventBus.on(OPERACAO_ITEM_ERRO_EVENT).subscribe(mensagem => {
      this.dadosAlerta.definirMensagemErro(mensagem as string);
    });
  }

  private onSalvarItemEvent(eventBus: NgEventBus) {
    return eventBus.on(SALVAR_ITEM_SUCESSO_EVENT).subscribe(() => {
      if (this.item && !this.item.id) {
        this.formulario.reset();
      }
      this.dadosAlerta.definirMensagemSucesso().fecharMensagemAutomaticamente();
    });
  }

  private onFechaMensagemEvent(eventBus: NgEventBus) {
    return eventBus.on(FECHA_MENSAGEM_EVENT).subscribe(() => {
      this.dadosAlerta.limparMensagem();
    });
  }

  private onBuscarItemEvent(eventBus: NgEventBus) {
    return eventBus.on(BUSCAR_ITENS_SUCESSO_EVENT).subscribe(itens => {
      this.addItens(itens as Item[]);
    });
  }
}
