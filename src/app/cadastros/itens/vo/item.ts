import { Cadastro } from '../../abstracts/cadastro';

export class Item extends Cadastro {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;

  static parse(response: Item) {
    const item = new Item();
    item.id = response.id;
    item.nome = response.nome;
    item.valor = response.valor;
    item.quantidade = response.quantidade;

    return item;
  }
}
