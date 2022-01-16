import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  constructor(public cookieService: CookieService,private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.cookieService.deleteAll();
    this.router.navigate(['']);
  }

}
