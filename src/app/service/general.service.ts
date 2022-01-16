import { Producto } from './../models/Producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Respuesta } from '../models/Respuesta';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../models/Usuario';
import { Pedido } from '../models/Pedido';

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

  guardarProductos(producto: Producto){
    return this.http.post<Respuesta>(`${this.url}/api/Productos/GuardarProducto`, producto, {headers: this.reqHeader});
  }

  cargarProductos(){
    return this.http.get<Respuesta>(`${this.url}/api/Productos/ObtenerProductos`,  {headers: this.reqHeader});
  }

  cargarProducto(id: number){
    return this.http.get<Respuesta>(`${this.url}/api/Productos/ObtenerProducto?Id=${id}`,  {headers: this.reqHeader});
  }

  editarProducto(producto: Producto, id:number){
    return this.http.put<Respuesta>(`${this.url}/api/Productos/EditarProducto?Id=${id}`, producto,  {headers: this.reqHeader});
  }

  borrarProducto(id:number){
    return this.http.delete<Respuesta>(`${this.url}/api/Productos/BorrarProducto?Id=${id}`,  {headers: this.reqHeader});
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


  guardarPedido(pedido: Pedido){
    return this.http.post<Respuesta>(`${this.url}/api/Pedidos/GuardarPedido`, pedido, {headers: this.reqHeader});
  }

  cargarPedidos(){
    return this.http.get<Respuesta>(`${this.url}/api/Pedidos/ObtenerPedidos`,  {headers: this.reqHeader});
  }

  cargarPedido(id: number){
    return this.http.get<Respuesta>(`${this.url}/api/Pedidos/ObtenerPedido?Id=${id}`,  {headers: this.reqHeader});
  }

  editarPedido(pedido: Pedido, id:number){
    return this.http.put<Respuesta>(`${this.url}/api/Pedidos/EditarPedido?Id=${id}`, pedido,  {headers: this.reqHeader});
  }

  borrarPedido(id:number){
    return this.http.delete<Respuesta>(`${this.url}/api/Pedidos/BorrarPedido?Id=${id}`,  {headers: this.reqHeader});
  }
}
