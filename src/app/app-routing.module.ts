import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SecurityGuard } from './security/security.guard';
import { VuelosComponent } from './components/vuelos/vuelos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [SecurityGuard],children: [
      { path: 'vuelos', component: VuelosComponent, canActivate: [SecurityGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [SecurityGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
