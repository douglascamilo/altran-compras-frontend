export class DadosPaginacao<T> {
  pagina: number = 1;
  itensPagina: number = 5;

  obterDadosPaginados(dados: T[]): T[] {
    return dados
      .slice((this.pagina - 1) * this.itensPagina, (this.pagina - 1) * this.itensPagina + this.itensPagina);
  }
}
