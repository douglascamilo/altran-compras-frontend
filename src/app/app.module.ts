import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LayoutModule } from './layout/layout.module';
import { ItensModule } from './itens/itens.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    UsuariosModule,
    ItensModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
