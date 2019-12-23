import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDivComponent } from './main-div.component';

@NgModule({
  declarations: [MainDivComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MainDivComponent
  ]
})
export class MainDivModule { }
