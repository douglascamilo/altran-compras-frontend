import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CadastrosModule } from './cadastros/cadastros.module';
import { NgEventBus } from 'ng-event-bus';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    CadastrosModule
  ],
  providers: [NgEventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }
