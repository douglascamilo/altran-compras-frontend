import { Item } from '../../itens/vo/item';

export class Carrinho {
  id: string;
  usuarioId: string;
  itens: Item[];

  static parse(response: Carrinho): Carrinho {
    const carrinho = new Carrinho();
    carrinho.id = response.id;
    carrinho.usuarioId = response.usuarioId;
    carrinho.itens = response.itens ? response.itens.map(itemMap => Item.parse(itemMap)) : [];

    return carrinho;
  }

  adicionar(item: Item) {
    const itemIndex = this.itens.findIndex(itemLista => itemLista.id == item.id);

    if (itemIndex >= 0) {
      this.itens[itemIndex] = Item.parse(item);
      return;
    }

    this.itens.push(Item.parse(item));
  }

  remover(itemId: string) {
    const itemIndex = this.itens.findIndex(itemLista => itemLista.id == itemId);

    this.itens.splice(itemIndex, 1);
  }
}
