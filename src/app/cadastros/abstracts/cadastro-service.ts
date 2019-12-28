import { Cadastro } from './cadastro';

export interface CadastroService<T extends Cadastro> {

  salvar(cadastro: T);

  excluir(id: string);

  buscarTodos();
}
