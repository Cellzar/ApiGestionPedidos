import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../service/general.service';
import { Usuario } from '../../models/Usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioEditar: Usuario = new Usuario();
  passConfirm: string = '';
  passConfirmModal: string = '';
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['usuId', 'usuNombre', 'accion'];
  dataSource!: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content', { static: true }) modal!: ElementRef;
  constructor(public general: GeneralService, private modalService: NgbModal, config: NgbModalConfig, public loginService: LoginService) {
    this.cargarUsuarios();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  cargarUsuarios() {
    this.general.cargarUsuarios().subscribe(
      result => {
        this.usuarios = result.data;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.usuarios);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarUsuario() {
    if (this.usuario.usuPass != this.passConfirm) {
      Swal.fire('', 'Contraseñas no coinciden', 'warning');
    } else if (this.usuario.usuPass == '' || this.usuario.usuNombre == '') {
      Swal.fire('', 'Por favor complete los campos', 'warning');
    } else {
      this.general.guardarUsuario(this.usuario).subscribe(
        result => {
          if (result.mensaje == 'Usuario registrado') {
            Swal.fire('Hecho', result.mensaje, 'success');
            this.usuario = new Usuario();
            this.passConfirm = '';
            this.cargarUsuarios();
          } else {
            Swal.fire('', result.mensaje, 'warning');
          }
        },
        error => {
          Swal.fire('error', error, 'warning');
          console.log(error);
        }
      )
    }
  }

  editarUsuario() {
    console.log(this.usuarioEditar);
    if (this.usuarioEditar.usuPass != this.passConfirmModal) {
      Swal.fire('', 'Contraseñas no coinciden', 'warning');
    } else if (this.usuarioEditar.usuPass == '' || this.usuarioEditar.usuNombre == '') {
      Swal.fire('', 'Por favor complete los campos', 'warning');
    } else {
      this.general.editarUsuario(this.usuarioEditar, this.usuarioEditar.usuId).subscribe(
        result => {
          console.log(result);
          if (result.mensaje == 'Usuario actualizado') {
            Swal.fire('Hecho', result.mensaje, 'success');
            this.usuarioEditar = new Usuario();
            this.cerrarModal(this.modal);
          }else{
            Swal.fire('', result.mensaje, 'warning');
          }
          this.cargarUsuarios();
        },
        error => {
          console.log(error);
          Swal.fire('error', error, 'warning');
        }
      )
    }
  }

  abrirModal(data: Usuario) {
    this.modalService.open(this.modal, { size: 'lg' });
    this.buscarUsuario(data.usuId);
  }

  cerrarModal(modal: any) {
    this.modalService.dismissAll(modal);
  }

  buscarUsuario(id: number) {
    this.general.cargarUsuario(id).subscribe(
      result => {
        this.usuarioEditar = result.data;
        this.passConfirmModal = this.usuarioEditar.usuPass;
      },
      error => {
        console.log(error);
        Swal.fire('error', error, 'warning');
      }
    )
  }

  borrarUsuario(id: number) {
    Swal.fire({
      title: 'Seguro de que quieres borrar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      icon:'warning',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {


        this.general.borrarUsuario(id).subscribe(
          result => {
            Swal.fire('Registro borrado!', '', 'success');
            this.cargarUsuarios();
            console.log(result);
          },
          error => {
            console.log(error);
          }
        )

      } else {
        Swal.fire('Registro no borrado', '', 'warning');
      }
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
