import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDivModule } from '../shared/main-div/main-div.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ItensComponent } from './itens/itens.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { VMensagemModule } from '../shared/v-mensagem/v-mensagem.module';
import { UsuariosService } from './usuarios/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertaModule } from '../shared/alerta/alerta.module';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    ItensComponent,
    CarrinhoComponent,
    UsuariosListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AlertaModule,
    MainDivModule,
    VMensagemModule
  ]
})
export class CadastrosModule {

}
