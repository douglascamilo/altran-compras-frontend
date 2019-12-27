import { Cadastro } from './cadastro';

export class UrlData<T extends Cadastro> {

  constructor(
    public cadastro: T) { }
}
