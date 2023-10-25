import { Cliente } from './cliente';
import { Paciente } from './paciente';
import { Proveedor } from './proveedor';

export class Veterinaria {
    private clientesAsociados: Cliente[] = [];
    private pacientesAsociados: Paciente[] = [];
    private proveedoresAsociados: Proveedor[] = [];

    constructor(public id: number, public nombre: string, public dirección: string) { }

    modificarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }

    modificarDireccion(nuevaDirección: string) {
        this.dirección = nuevaDirección;
    }

    // Métodos para asociar clientes, pacientes y proveedores
    asociarCliente(cliente: Cliente) {
        this.clientesAsociados.push(cliente);
    }

    asociarPaciente(paciente: Paciente) {
        this.pacientesAsociados.push(paciente);
    }

    asociarProveedor(proveedor: Proveedor) {
        this.proveedoresAsociados.push(proveedor);
    }

}
