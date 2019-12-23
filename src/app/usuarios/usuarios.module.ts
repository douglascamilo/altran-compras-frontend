import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { MainDivModule } from '../shared/main-div/main-div.module';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    MainDivModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
