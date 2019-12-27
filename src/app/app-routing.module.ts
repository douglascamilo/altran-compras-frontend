import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ItensComponent } from './cadastros/itens/itens.component';
import { CarrinhoComponent } from './cadastros/carrinho/carrinho.component';
import { Usuario } from './cadastros/usuarios/usuario';
import { Item } from './cadastros/itens/vo/item';
import { FluxoExecucaoEnum } from './shared/enums/fluxo-execucao.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    // data: { usuario: { id: '5e046365442c6e3f1649fbf6', nome: 'Douglas Sousa', email: 'douglascamilo@gmail.com' } as Usuario }
  },
  {
    path: 'itens',
    component: ItensComponent,
    // data: {
    //   item: { id: '5e05a96885d4aa362131980c', valor: 79.88, nome: 'Produto 4' },
    //   fluxoExecucao: FluxoExecucaoEnum.EXCLUSAO,
    // },
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
