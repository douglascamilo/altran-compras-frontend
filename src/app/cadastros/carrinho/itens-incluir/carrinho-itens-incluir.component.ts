import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AltranValidators } from '../../../shared/validators/altran.validators';
import { Item } from '../../itens/vo/item';
import { NgEventBus } from 'ng-event-bus';
import { SALVAR_ITEM_CARRINHO_EVENT } from '../itens/carrinho-itens.component';
import { Router } from '@angular/router';
import { CarrinhoService } from '../service/carrinho.service';
import { Carrinho } from '../vo/carrinho';

@Component({
  selector: 'app-carrinho-itens-incluir',
  templateUrl: './carrinho-itens-incluir.component.html'
})
export class CarrinhoItensIncluirComponent implements OnInit {
  formulario: FormGroup;
  itemSelecionado: Item;
  carrinhoSelecionado: Carrinho;

  constructor(
    private _formBuilder: FormBuilder,
    private _eventBus: NgEventBus,
    private _router: Router,
    private _carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itemSelecionado = history.state.itemSelecionado as Item;
    this.carrinhoSelecionado = history.state.carrinhoSelecionado as Carrinho;
    this.criarFormulario();
  }

  salvar() {
    this.itemSelecionado.quantidade = Number(this.formulario.get('quantidade').value);

    this._carrinhoService.gravarItem(this.itemSelecionado, this.carrinhoSelecionado)
      .subscribe(() => {
        this._eventBus.cast(SALVAR_ITEM_CARRINHO_EVENT, this.itemSelecionado);
        this._router.navigate(['/carrinho/itens']);
      });
  }

  private criarFormulario() {
    this.formulario = this._formBuilder.group({
      nome: [this.itemSelecionado.nome],
      valor: [this.itemSelecionado.valor],
      quantidade: [this.itemSelecionado.quantidade, [Validators.required, AltranValidators.menorIgualZero]]
    })
  }
}
