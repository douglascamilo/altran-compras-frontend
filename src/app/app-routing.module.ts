import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ItensComponent } from './cadastros/itens/itens.component';
import { CarrinhoComponent } from './cadastros/carrinho/carrinho.component';
import { Usuario } from './cadastros/usuarios/vo/usuario';
import { Item } from './cadastros/itens/vo/item';
import { FluxoExecucaoEnum } from './shared/enums/fluxo-execucao.enum';
import { UsuariosListComponent } from './cadastros/usuarios/usuarios-list.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

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
