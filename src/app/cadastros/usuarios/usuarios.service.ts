import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5555/usuario';

@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }

  salvar(usuario: Usuario): Observable<Object> {
    if (usuario.id) {
      const url = `${API_URL}/${usuario.id}`;
      return this.http.put(url, usuario);
    }

    return this.http.post(API_URL, usuario);
  }
}
