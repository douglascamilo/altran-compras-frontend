import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from './alerta.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AlertaComponent],
  imports: [
    CommonModule,
    NgbAlertModule
  ],
  exports: [AlertaComponent]
})
export class AlertaModule { }
