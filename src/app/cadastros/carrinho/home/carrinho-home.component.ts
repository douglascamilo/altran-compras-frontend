import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-home',
  templateUrl: './carrinho-home.component.html'
})
export class CarrinhoHomeComponent {

  constructor(
    private router: Router) { }

  incluirNovo() {
    this.router.navigateByUrl('/carrinho/novo');
  }

  listarExistentes() {

  }
}
