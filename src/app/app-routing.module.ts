import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ItensComponent } from './cadastros/itens/itens.component';
import { UsuariosListComponent } from './cadastros/usuarios/usuarios-list.component';
import { ItensListComponent } from './cadastros/itens/itens-list.component';
import { CarrinhoHomeComponent } from './cadastros/carrinho/home/carrinho-home.component';
import { CarrinhoNovoComponent } from './cadastros/carrinho/novo/carrinho-novo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UsuariosListComponent
  },
  {
    path: 'usuario/form',
    component: UsuariosComponent
  },
  {
    path: 'itens',
    component: ItensListComponent
  },
  {
    path: 'itens/form',
    component: ItensComponent
  },
  {
    path: 'carrinho',
    component: CarrinhoHomeComponent
  },
  {
    path: 'carrinho/novo',
    component: CarrinhoNovoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
