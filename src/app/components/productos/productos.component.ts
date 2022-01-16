import { Producto } from './../../models/Producto';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../service/general.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto: Producto = new Producto();
  productoEditar: Producto = new Producto();
  productos: Producto[] = [];
  displayedColumns: string[] = ['proId', 'proDesc', 'proValor', 'accion'];
  dataSource!: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content', { static: true}) modal!: ElementRef;
  constructor(public general: GeneralService, private modalService: NgbModal, config: NgbModalConfig) {
    this.cargarProductos();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  cargarProductos() {
    this.general.cargarProductos().subscribe(
      result => {
        this.productos = result.data;
        this.dataSource = new MatTableDataSource<Producto>(this.productos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.productos);
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarProducto() {
    if (this.producto.proDesc == "" || this.producto.proValor == 0) {
      Swal.fire('', 'Por favor complete los campos','warning');
    } else {
      this.general.guardarProductos(this.producto).subscribe(
        result => {
          if (result.mensaje == 'Producto registrado') {
            Swal.fire('Hecho', result.mensaje, 'success');
            this.producto = new Producto();
            this.cargarProductos();
          }
        },
        error => {
          Swal.fire('error', error, 'warning');
          console.log(error);
        }
      )
    }
  }

  editarProducto(){
    this.general.editarProducto(this.productoEditar, this.productoEditar.proId).subscribe(
      result =>{
        console.log(result);
        if(result.mensaje == 'Producto actualizado'){
          Swal.fire('Hecho', result.mensaje, 'success');
          this.productoEditar = new Producto();
          this.cerrarModal(this.modal);
        }
        this.cargarProductos();
      },
      error => {
        console.log(error);
        Swal.fire('error', error, 'warning');
      }
    )
  }

  abrirModal(data:Producto){
    this.modalService.open(this.modal, { size: 'lg' });
    this.buscarProducto(data.proId);
  }

  cerrarModal(modal: any){
    this.modalService.dismissAll(modal);
  }

  buscarProducto(id:number){
    this.general.cargarProducto(id).subscribe(
      result =>{
        this.productoEditar = result.data;
      },
      error =>{
        console.log(error);
        Swal.fire('error', error, 'warning');
      }
    )
  }

  borrarProducto(id:number){
    Swal.fire({
      title: 'Seguro de que quieres borrar este producto?',
      showCancelButton: true,
      icon:'warning',
      confirmButtonText: 'Si',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {


        this.general.borrarProducto(id).subscribe(
          result => {
            Swal.fire('Registro borrado!', '', 'success');
            this.cargarProductos();
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
