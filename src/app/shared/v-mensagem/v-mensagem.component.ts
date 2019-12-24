import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-v-mensagem',
  templateUrl: './v-mensagem.component.html'
})
export class VMensagemComponent {
  @Input() mensagem = '';

  constructor() {}
}
