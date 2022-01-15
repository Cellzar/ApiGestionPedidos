import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: BarraSuperiorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
