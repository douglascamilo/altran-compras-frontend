import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainDivModule } from '../shared/main-div/main-div.module';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainDivModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
