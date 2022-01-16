import { Producto } from "./Producto";
import { Usuario } from "./Usuario";

export class Pedido {
  pedId!: number;
  pedUsu!: number;
  pedPro!: number;
  pedVrUnit!: number;
  pedCant!: number;
  pedSubtot!: number;
  pedIva!: number;
  pedTotal!: number;
  pedProNavigation: Producto = new Producto();
  pedUsuNavigation: Usuario = new Usuario();
}
