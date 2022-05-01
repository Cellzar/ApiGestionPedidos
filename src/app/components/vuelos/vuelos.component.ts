import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../service/general.service';
import { Vuelos } from '../../models/Vuelos';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../service/login.service';
@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css'],
})
export class VuelosComponent implements OnInit {
  public listadoCiudades: any = null;
  public listadoAeroLinea: any = null;
  public datosVueloIngresar: Vuelos = new Vuelos();
  public datosVueloEditar: Vuelos = new Vuelos();
  vuelos: Vuelos[] = [];
  displayedColumns: string[] = [
    'id',
    'ciudadOrigen',
    'ciudadDestino',
    'aerolinea',
    'numeroVuelo',
    'horaSalida',
    'horaLlegada',
    'fecha',
    'estado',
    'accion',
  ];
  dataSource!: MatTableDataSource<Vuelos>;
  @ViewChild('content', { static: true }) modal!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: GeneralService,
    private modalService: NgbModal,
    public loginService: LoginService,
    config: NgbModalConfig
  ) {
    this.obtenerListadoCiudad();
    this.obtenerListadoAerolinea();
    this.cargarVuelos();
  }

  ngOnInit(): void {}

  obtenerListadoCiudad() {
    this.service.cargarListadoCiudades().subscribe(
      (result) => {
        this.listadoCiudades = result;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerListadoAerolinea() {
    this.service.cargarListadoAerolineas().subscribe(
      (result) => {
        this.listadoAeroLinea = result;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarVuelos() {
    this.service.cargarVuelos().subscribe(
      (result) => {
        this.vuelos = result.data;
        this.dataSource = new MatTableDataSource<Vuelos>(this.vuelos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(result);
      },
      (error) => {
        Swal.fire('error', error, 'warning');
        console.log(error);
      }
    );
  }

  guardar() {
    console.log(this.datosVueloIngresar);
    if (
      this.datosVueloIngresar.ciudadDestino == 0 ||
      this.datosVueloIngresar.ciudadOrigen == 0 ||
      this.datosVueloIngresar.aerolinea == 0
    ) {
      Swal.fire('Alerta', 'Por favor ingrese todos los campos', 'warning');
    } else if (
      this.datosVueloIngresar.ciudadDestino ==
      this.datosVueloIngresar.ciudadOrigen
    ) {
      Swal.fire(
        'Alerta',
        'La ciudades de origen y destino no pueden ser la misma',
        'warning'
      );
    } else {
      this.service.guardarVuelo(this.datosVueloIngresar).subscribe(
        (result) => {
          if (result.esError) {
            Swal.fire('Error', result.mensaje, 'warning');
          } else {
            Swal.fire('Exito', result.mensaje, 'success');
            this.cargarVuelos();
            this.datosVueloIngresar = new Vuelos();
          }
        },
        (error) => {
          Swal.fire('error', error, 'warning');
          console.log(error);
        }
      );
    }
  }

  borrarVuelo(id: number) {
    Swal.fire({
      title: 'Seguro de que quieres borrar este vuelo?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.borrarVuelo(id).subscribe(
          (result) => {
            Swal.fire('Registro borrado!', '', 'success');
            this.cargarVuelos();
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        Swal.fire('Registro no borrado', '', 'warning');
      }
    });
  }

  abrirModal(data) {
    this.modalService.open(this.modal, { size: 'lg' });
    this.buscarVuelo(data.id);
  }

  buscarVuelo(id: number) {
    this.service.cargarVuelo(id).subscribe(
      (result) => {
        this.datosVueloEditar = result.data[0];
        console.log(result);
      },
      (error) => {
        console.log(error);
        Swal.fire('error', error, 'warning');
      }
    );
  }

  editarVuelo() {
    if (
      this.datosVueloEditar.ciudadDestino ==
      this.datosVueloEditar.ciudadOrigen
    ) {
      Swal.fire(
        'Alerta',
        'La ciudades de origen y destino no pueden ser la misma',
        'warning'
      );
    } else {
      console.log(this.datosVueloEditar);
      this.datosVueloEditar.aerolinea = parseInt(
        this.datosVueloEditar.aerolinea.toString()
      );
      this.datosVueloEditar.ciudadDestino = parseInt(
        this.datosVueloEditar.ciudadDestino.toString()
      );
      this.datosVueloEditar.ciudadOrigen = parseInt(
        this.datosVueloEditar.ciudadOrigen.toString()
      );
      this.service.editarVuelo(this.datosVueloEditar).subscribe(
        (result) => {
          if (result.esError) {
            Swal.fire('Error', result.mensaje, 'warning');
          } else {
            Swal.fire('Exito', result.mensaje, 'success');
            this.datosVueloEditar = new Vuelos();
            this.cerrarModal(this.modal);
            this.cargarVuelos();
          }
        },
        (error) => {
          console.log(error);
          Swal.fire('error', error, 'warning');
        }
      );
    }
  }

  cerrarModal(modal: any) {
    this.modalService.dismissAll(modal);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
