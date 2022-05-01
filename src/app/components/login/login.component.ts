import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { LoginService } from '../../service/login.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(private router: Router, public service: LoginService, private cookieService: CookieService) { }

  ngOnInit() {
    if(this.cookieService.get('token') != "" || this.cookieService.get('token') != undefined){
      this.router.navigate(["home"]);
    }
  }

  login(): void {
    if (this.usuario.usuNombre != '' && this.usuario.usuPass != '') {
      // this.router.navigate(["home"]);

      this.service.login(this.usuario).subscribe(
        result => {
          console.log(result);
          if(result.mensaje == 'Bienvenido al sistema'){
            Swal.fire('Hecho', result.mensaje, 'success');
            this.service.perfilId = result.data['usuario'].perfil;
            this.cookieService.set('token', result.data['token']);
            this.cookieService.set('perfil', result.data['usuario'].perfil);
            this.router.navigate(["home"]);
          }else{
            Swal.fire('Error', result.mensaje, 'warning');
          }
        },error =>{
          Swal.fire('Error', error.mensaje, 'warning');
          console.log(error);
        }
      )
    } else {
      Swal.fire('Error', 'Ingrese usuario y contraseña', 'warning');
    }
  }
}

