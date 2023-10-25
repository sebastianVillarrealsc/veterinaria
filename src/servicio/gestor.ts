import { Veterinaria } from '../entidades/veterinaria';
import { Cliente } from '../entidades/cliente';
import { Paciente } from '../entidades/paciente';
import { Proveedor } from '../entidades/proveedor';

export class GestorVeterinarias {
    private veterinarias: Veterinaria[] = [];
    private clientes: Cliente[] = [];
    private pacientes: Paciente[] = [];
    private proveedores: Proveedor[] = [];

    getVeterinaria(id: number) {
        return this.veterinarias.find(veterinaria => veterinaria.id === id);
    }

    altaVeterinaria(veterinaria: Veterinaria) {

    }

    modificarVeterinaria(id: number, nuevaInformación: Partial<Veterinaria>) {

    }

    bajaVeterinaria(id: number) {

    }

    getClientes() {
        return this.clientes;
    }

    altaCliente(nombre: string, telefono: string, esVIP: boolean, numeroVisitas: number, veterinariaId: number) {
        // Verificar si la veterinaria existe
        const veterinaria = this.veterinarias.find((v) => v.id === veterinariaId);

        if (!veterinaria) {
            console.log('La veterinaria no existe. No se ha agregado el cliente.');
            return null; // Retorna null para indicar que no se agregó el cliente
        }

        // Crear una nueva instancia de Cliente
        const nuevoCliente = new Cliente(null, nombre, telefono, esVIP, numeroVisitas, veterinariaId);

        // Asociar al cliente con la veterinaria
        nuevoCliente.veterinariaId = veterinaria.id;

        // Agregar el cliente a la lista de clientes
        this.clientes.push(nuevoCliente);

        return nuevoCliente; // Retorna el cliente agregado
    }


    altaPaciente(paciente: Paciente) {

    }

    altaProveedor(proveedor: Proveedor) {

    }

}
