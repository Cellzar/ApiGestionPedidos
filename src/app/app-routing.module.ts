import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SecurityGuard } from './security/security.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [SecurityGuard],children: [
      { path: 'productos', component: ProductosComponent, canActivate: [SecurityGuard] },
      { path: 'pedidos', component: PedidosComponent, canActivate: [SecurityGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [SecurityGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
