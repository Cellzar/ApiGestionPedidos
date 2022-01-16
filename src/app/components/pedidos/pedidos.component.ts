import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { Usuario } from 'src/app/models/Usuario';
import { GeneralService } from '../../service/general.service';
import { Pedido } from '../../models/Pedido';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  pedidos: Pedido[] = [];
  pedido: Pedido = new Pedido();
  pedidoEditar: Pedido = new Pedido();
  public formGroup!: FormGroup;
  public formGroupEditar!: FormGroup;
  displayedColumns: string[] = ['pedId', 'usuario', 'producto', 'pedVrUnit', 'pedCant', 'pedSubtot', 'pedIva', 'pedTotal', 'accion'];
  dataSource!: MatTableDataSource<Pedido>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('content', { static: true}) modal!: ElementRef;

  constructor(
    public general: GeneralService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private formBuilder: FormBuilder) {

    this.cargarUsuario();
    this.cargarProductos();
    this.cargarPedidos();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  cargarUsuario() {
    this.general.cargarUsuarios().subscribe(
      result => {
        this.usuarios = result.data;
        console.log(result);
      }, error => {
        console.log(error);
      }
    )
  }

  cargarProductos() {
    this.general.cargarProductos().subscribe(
      result => {
        this.productos = result.data;
        console.log(this.productos);
      },
      error => {
        console.log(error);
      }
    )
  }


  cargarPedidos() {
    this.general.cargarPedidos().subscribe(
      result => {
        this.pedidos = result.data;
        this.dataSource = new MatTableDataSource<Pedido>(this.pedidos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.pedidos);
      },
      error => {
        console.log(error);
      }
    )
  }

  buscarPedido(id:number){
    this.general.cargarPedido(id).subscribe(
      result =>{
        this.pedidoEditar = result.data;
      },
      error =>{
        console.log(error);
        Swal.fire('error', error, 'warning');
      }
    )
  }

  abrirModal(data:Pedido){
    this.modalService.open(this.modal, { size: 'lg' });
    this.buscarPedido(data.pedId);
  }

  cerrarModal(modal: any){
    this.modalService.dismissAll(modal);
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      pedUsu: ['', [ Validators.required]],
      pedPro: ['', [ Validators.required]],
      pedVrUnit: ['', [ Validators.required]],
      pedCant: ['', [ Validators.required]],
      pedSubtot: ['', [ Validators.required]],
      pedIva: ['', [ Validators.required]],
      pedTotal: ['', [ Validators.required]]
    });

    this.formGroupEditar = this.formBuilder.group({
      pedUsu: ['', [ Validators.required]],
      pedPro: ['', [ Validators.required]],
      pedVrUnit: ['', [ Validators.required]],
      pedCant: ['', [ Validators.required]],
      pedSubtot: ['', [ Validators.required]],
      pedIva: ['', [ Validators.required]],
      pedTotal: ['', [ Validators.required]]
    });
  }


  guardarPedido() {
    const user = this.formGroup.value;
    console.log(user);
    this.general.guardarPedido(this.pedido).subscribe(
      result => {
        if (result.mensaje == 'Pedido registrado') {
          Swal.fire('Hecho', result.mensaje, 'success');
          this.formGroup.reset();
          this.cargarPedidos();
        }
      },
      error => {
        Swal.fire('error', error, 'warning');
        console.log(error);
      }
    )
  }

  borrarProducto(id:number){
    Swal.fire({
      title: 'Seguro de que quieres borrar este pedido?',
      showCancelButton: true,
      icon:'warning',
      confirmButtonText: 'Si',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {


        this.general.borrarPedido(id).subscribe(
          result => {
            Swal.fire('Registro borrado!', '', 'success');
            this.cargarPedidos();
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

  editarPedido(){
    this.general.editarPedido(this.pedidoEditar, this.pedidoEditar.pedId).subscribe(
      result =>{
        console.log(result);
        if(result.mensaje == 'Pedido actualizado'){
          Swal.fire('Hecho', result.mensaje, 'success');
          this.formGroupEditar.reset();
          this.cerrarModal(this.modal);
        }
        this.cargarPedidos();
      },
      error => {
        console.log(error);
        Swal.fire('error', error, 'warning');
      }
    )
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
