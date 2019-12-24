import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ItensComponent } from './cadastros/itens/itens.component';
import { CarrinhoComponent } from './cadastros/carrinho/carrinho.component';
import { Usuario } from './cadastros/usuarios/usuario';

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
    component: ItensComponent
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
