import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensComponent } from './itens.component';
import { MainDivModule } from '../shared/main-div/main-div.module';

@NgModule({
  declarations: [ItensComponent],
  imports: [
    CommonModule,
    MainDivModule
  ],
  exports: [
    ItensComponent
  ]
})
export class ItensModule { }
