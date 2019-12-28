import { Cadastro } from '../../abstracts/cadastro';

export class Item extends Cadastro {
  id: string;
  nome: string;
  valor: number;

  static criar(response: Item) {
    const item = new Item();
    item.id = response.id;
    item.nome = response.nome;
    item.valor = response.valor;

    return item;
  }
}
