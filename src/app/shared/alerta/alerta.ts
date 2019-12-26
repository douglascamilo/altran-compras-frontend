export class DadosAlerta {
  public tipo = 'info';
  public mensagem = '';

  limparMensagem() {
    this.mensagem = '';
  }

  possuiMensagem() {
    return this.mensagem;
  }

  definirMensagemErro(mensagem: string) {
    this.tipo = 'danger';
    this.mensagem = mensagem;
  }
}
