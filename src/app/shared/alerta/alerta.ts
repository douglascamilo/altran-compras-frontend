export class DadosAlerta {
  public tipo = 'info';
  public mensagem = '';

  limparMensagem() {
    this.mensagem = '';
  }

  possuiMensagem() {
    return this.mensagem;
  }

  definirMensagemErro(mensagem: string): DadosAlerta {
    this.tipo = 'danger';
    this.mensagem = mensagem;

    return this;
  }

  definirMensagemSucesso(mensagem: string = 'Operação executada com sucesso!'): DadosAlerta {
    this.tipo = 'success';
    this.mensagem = mensagem;

    return this;
  }

  fecharMensagemAutomaticamente(tempoEmMilisegundos?: number) {
    setTimeout(() => this.limparMensagem(), tempoEmMilisegundos || 3000);
  }
}
