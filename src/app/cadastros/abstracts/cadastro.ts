export class Cadastro {
  selecionado: boolean = false;

  selecionar()  {
    this.selecionado = true;
  }

  deselecionar() {
    this.selecionado = false;
  }
}
