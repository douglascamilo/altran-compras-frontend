import { Cadastro } from '../../abstracts/cadastro';

export class Usuario extends Cadastro {
  id: string;
  nome: string;
  email: string;

  static criar(item: Usuario): Usuario {
    const usuario = new Usuario();
    usuario.id = item.id;
    usuario.nome = item.nome;
    usuario.email = item.email;

    return usuario;
  }
}
