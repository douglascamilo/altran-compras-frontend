import { Cadastro } from '../../interfaces/cadastro';

export class Usuario implements Cadastro {
  id: string;
  nome: string;
  email: string;
}
