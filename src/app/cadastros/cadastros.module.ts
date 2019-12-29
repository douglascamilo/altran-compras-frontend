import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDivModule } from '../shared/main-div/main-div.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ItensComponent } from './itens/itens.component';
import { VMensagemModule } from '../shared/v-mensagem/v-mensagem.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertaModule } from '../shared/alerta/alerta.module';
import { UsuariosListComponent } from './usuarios/usuarios-list.component';
import { UsuariosService } from './usuarios/service/usuarios.service';
import { ItemService } from './itens/service/item.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ItensListComponent } from './itens/itens-list.component';
import { CarrinhoHomeComponent } from './carrinho/home/carrinho-home.component';
import { CarrinhoNovoComponent } from './carrinho/novo/carrinho-novo.component';
import { CarrinhoService } from './carrinho/service/carrinho.service';
import { CarrinhoItensComponent } from './carrinho/itens/carrinho-itens.component';
import { CarrinhoItensBuscarComponent } from './carrinho/itens-buscar/carrinho-itens-buscar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarrinhoItensIncluirComponent } from './carrinho/itens-incluir/carrinho-itens-incluir.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    ItensComponent,
    UsuariosListComponent,
    ItensListComponent,
    CarrinhoHomeComponent,
    CarrinhoNovoComponent,
    CarrinhoItensComponent,
    CarrinhoItensBuscarComponent,
    CarrinhoItensIncluirComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AlertaModule,
    MainDivModule,
    VMensagemModule,
    NgbPaginationModule
  ],
  providers: [
    UsuariosService,
    ItemService,
    CarrinhoService
  ]
})
export class CadastrosModule {
}
