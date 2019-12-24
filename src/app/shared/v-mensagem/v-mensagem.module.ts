import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VMensagemComponent } from './v-mensagem.component';

@NgModule({
  declarations: [VMensagemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    VMensagemComponent
  ]
})
export class VMensagemModule { }
