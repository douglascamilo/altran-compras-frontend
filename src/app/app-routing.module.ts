import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ItensComponent } from './itens/itens.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
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
