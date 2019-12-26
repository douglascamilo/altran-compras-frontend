import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDivModule } from '../shared/main-div/main-div.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ItensComponent } from './itens/itens.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AlertaModule } from '../shared/alerta/alerta.module';

@NgModule({
  declarations: [
    UsuariosComponent,
    ItensComponent,
    CarrinhoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainDivModule,
    AlertaModule
  ]
})
export class CadastrosModule {

}
