import { Cadastro } from '../../interfaces/cadastro';

export class Item implements Cadastro {
  id: string;
  nome: string;
  valor: number;
}
