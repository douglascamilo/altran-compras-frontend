import { Cadastro } from '../../interfaces/cadastro';

export class Usuario implements Cadastro {
  id: string;
  nome: string;
  email: string;
  selecionado: boolean = false;

  selecionar()  {
    this.selecionado = true;
  }

  deselecionar() {
    this.selecionado = false;
  }

  static criar(item: Usuario): Usuario {
    const usuario = new Usuario();
    usuario.id = item.id;
    usuario.nome = item.nome;
    usuario.email = item.email;

    return usuario;
  }
}
