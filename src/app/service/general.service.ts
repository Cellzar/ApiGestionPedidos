import { Producto } from './../models/Producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Respuesta } from '../models/Respuesta';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../models/Usuario';
import { Pedido } from '../models/Pedido';
import { Vuelos } from '../models/Vuelos';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {



  public url = environment.url;

  public reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.cookieService.get('token')
  });

  constructor(public http: HttpClient, private cookieService: CookieService) { }

  cargarListadoCiudades(){
    return this.http.get<Respuesta>(`${this.url}/api/Listas/ObtenerCiudad`);
  }

  cargarListadoAerolineas(){
    return this.http.get<Respuesta>(`${this.url}/api/Listas/ObtenerAerolineas`);
  }

  cargarUsuarios(){
    return this.http.get<Respuesta>(`${this.url}/api/Usuarios/ObtenerUsuarios`,  {headers: this.reqHeader});
  }

  cargarUsuario(id: number){
    return this.http.get<Respuesta>(`${this.url}/api/Usuarios/ObtenerUsuario?Id=${id}`,  {headers: this.reqHeader});
  }

  guardarUsuario(usuario: Usuario){
    return this.http.post<Respuesta>(`${this.url}/api/Usuarios/GuardarUsuario`, usuario, {headers: this.reqHeader});
  }

  editarUsuario(usuario: Usuario, id:number){
    return this.http.put<Respuesta>(`${this.url}/api/Usuarios/EditarUsuario?Id=${id}`, usuario,  {headers: this.reqHeader});
  }

  borrarUsuario(id:number){
    return this.http.delete<Respuesta>(`${this.url}/api/Usuarios/BorrarUsuario?Id=${id}`,  {headers: this.reqHeader});
  }

  guardarVuelo(vuelos: Vuelos){
    return this.http.post<Respuesta>(`${this.url}/api/Vuelos/GuardarActualizarVuelo`, vuelos, {headers: this.reqHeader});
  }

  cargarVuelos(){
    console.log(this.reqHeader)
    return this.http.get<Respuesta>(`${this.url}/api/Vuelos/ObtenerVuelos`,  {headers: this.reqHeader});
  }

  cargarVuelo(id: number){
    return this.http.get<Respuesta>(`${this.url}/api/Vuelos/ObtenerVuelos?Id=${id}`,  {headers: this.reqHeader});
  }

  borrarVuelo(id:number){
    return this.http.delete<Respuesta>(`${this.url}/api/Vuelos/BorrarVuelo?Id=${id}`,  {headers: this.reqHeader});
  }

  editarVuelo(vuelos: Vuelos){
    return this.http.post<Respuesta>(`${this.url}/api/Vuelos/GuardarActualizarVuelo`, vuelos,  {headers: this.reqHeader});
  }
}
