import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  constructor(public cookieService: CookieService,private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.cookieService.deleteAll();
    this.cookieService.delete('token', '/');
    this.router.navigate(['']);
  }

}
