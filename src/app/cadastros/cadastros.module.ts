import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDivModule } from '../shared/main-div/main-div.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ItensComponent } from './itens/itens.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { VMensagemModule } from '../shared/v-mensagem/v-mensagem.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertaModule } from '../shared/alerta/alerta.module';
import { UsuariosListComponent } from './usuarios/usuarios-list.component';
import { UsuariosService } from './usuarios/service/usuarios.service';
import { ItemService } from './itens/service/item.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

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
    VMensagemModule,
    NgbPaginationModule
  ],
  providers: [
    UsuariosService,
    ItemService
  ]
})
export class CadastrosModule {

}
