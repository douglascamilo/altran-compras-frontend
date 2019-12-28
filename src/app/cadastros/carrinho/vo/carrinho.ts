import { Item } from '../../itens/vo/item';

export class Carrinho {
  id: string;
  usuarioId: string;
  itens: Item[];
}
