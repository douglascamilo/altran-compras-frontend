import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho.component';
import { MainDivModule } from '../shared/main-div/main-div.module';

@NgModule({
  declarations: [CarrinhoComponent],
  imports: [
    CommonModule,
    MainDivModule
  ],
  exports: [
    CarrinhoComponent
  ]
})
export class CarrinhoModule { }
