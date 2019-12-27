import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { UsuariosComponent } from './cadastros/usuarios/usuarios.component';
import { ItensComponent } from './cadastros/itens/itens.component';
import { CarrinhoComponent } from './cadastros/carrinho/carrinho.component';
import { Usuario } from './cadastros/usuarios/vo/usuario';
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
    // data: {
    //   cadastro: { id: '5e063d4b465fc644749c0a85', nome: 'Douglas Sousa', email: 'douglaszika@gmail.com' },
    //   fluxoExecucao: FluxoExecucaoEnum.EXCLUSAO,
    // }
  },
  {
    path: 'itens',
    component: ItensComponent,
    // data: {
    //   cadastro: { id: '5e05a96885d4aa362131980c', valor: 79.88, nome: 'Produto 4' },
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
