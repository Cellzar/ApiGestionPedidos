import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Respuesta } from '../models/Respuesta';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url: string = environment.url;
  public perfilId: number;
  constructor(public http: HttpClient) { }

  login(usuario: Usuario){
    return this.http.post<Respuesta>(`${this.url}/api/Usuarios/LoginUsuario`, usuario);
  }
}
