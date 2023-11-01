import { Veterinaria } from '../entidades/veterinaria';
import { Cliente } from '../entidades/cliente';
import { Paciente } from '../entidades/paciente';
import { Proveedor } from '../entidades/proveedor';

type VeterinariaArray = Veterinaria[];

export class GestorVeterinarias {
    public static veterinarias: VeterinariaArray = [];
    public static clientes: Cliente[] = [];
    public static pacientes: Paciente[] = [];
    public static proveedores: Proveedor[] = [];

    getVeterinaria(id: number) {
        return GestorVeterinarias.veterinarias.find(veterinaria => veterinaria.id === id);
    }

    altaVeterinaria(id: number | null, nombre: string, dirección: string): Veterinaria {
        const nuevaVeterinaria = new Veterinaria(id, nombre, dirección);
        GestorVeterinarias.veterinarias.push(nuevaVeterinaria);
        return nuevaVeterinaria;
    }

    bajaVeterinaria(id: number) {
        const index = GestorVeterinarias.veterinarias.findIndex((veterinaria) => veterinaria.id === id);
        if (index !== -1) {
            GestorVeterinarias.veterinarias.splice(index, 1);
            console.log(`Veterinaria con ID ${id} ha sido dada de baja.`);
        } else {
            console.log(`No se encontró una veterinaria con ID ${id}.`);
        }
    }

    getClientes(id: number | null, veterinariaId: number | null = null): Cliente | Cliente[] | undefined {
        if (id) {
            // Si se proporciona un ID de cliente, busca el cliente por ID y, opcionalmente, el ID de la veterinaria
            if (veterinariaId) {
                return GestorVeterinarias.clientes.find((cliente) => cliente.id === id && cliente.veterinariaId === veterinariaId);
            } else {
                return GestorVeterinarias.clientes.find((cliente) => cliente.id === id);
            }
        }

        // Si no se proporciona un ID de cliente, devuelve una lista de todos los clientes
        if (veterinariaId) {
            return GestorVeterinarias.clientes.filter((cliente) => cliente.veterinariaId === veterinariaId);
        } else {
            return GestorVeterinarias.clientes;
        }
    }

    altaCliente(nombre: string, telefono: string, esVIP: boolean, numeroVisitas: number, veterinariaId: number, mascotaId?: number) {
        // Verificar si la veterinaria existe
        const veterinaria = GestorVeterinarias.veterinarias.find((v) => v.id === veterinariaId);

        if (!veterinaria) {
            console.log('La veterinaria no existe. No se ha agregado el cliente.');
            return null;
        }

        // Crear una nueva instancia de Cliente
        const nuevoCliente = new Cliente(0, nombre, telefono, esVIP, numeroVisitas, veterinariaId, mascotaId);

        // Asociar al cliente con la veterinaria
        nuevoCliente.veterinariaId = veterinaria.id!;

        // Agregar el cliente a la lista de clientes
        GestorVeterinarias.clientes.push(nuevoCliente);
        return nuevoCliente;
    }

    bajaCliente(cliente: Cliente) {
        const index = GestorVeterinarias.clientes.findIndex((c) => c.id === cliente.id);
        if (index !== -1) {
            GestorVeterinarias.clientes.splice(index, 1);
            console.log(`Cliente con ID ${cliente.id} ha sido dado de baja.`);
        } else {
            console.log(`No se encontró un cliente con ID ${cliente.id}.`);
        }
    }

    getPacientes(id: number | null, veterinariaId: number | null = null): Paciente | Paciente[] | undefined {
        if (id) {
            // Si se proporciona un ID de paciente, busca el paciente por ID y, opcionalmente, el ID de la veterinaria
            if (veterinariaId) {
                return GestorVeterinarias.pacientes.find((paciente) => paciente.id === id && paciente.idVeterinaria === veterinariaId);
            } else {
                return GestorVeterinarias.pacientes.find((paciente) => paciente.id === id);
            }
        }

        // Si no se proporciona un ID de paciente, devuelve una lista de todos los pacientes
        if (veterinariaId) {
            return GestorVeterinarias.pacientes.filter((paciente) => paciente.idVeterinaria === veterinariaId);
        } else {
            return GestorVeterinarias.pacientes;
        }

    }

    altaPaciente(id: number | null, nombre: string, nuevaEspecie: string, peso: string, sexo: string, color: string, idVeterinaria: number, idCliente: number) {
        let especie: string;
        if (nuevaEspecie === 'perro' || nuevaEspecie === 'gato') {
            especie = nuevaEspecie;
        } else {
            especie = 'exotica';
        }

        const nuevaMascota = new Paciente(id!, nombre, especie, peso, sexo, color, idVeterinaria, idCliente);

        if (!GestorVeterinarias.veterinarias.find((v) => v.id === idVeterinaria)) {
            console.log('La veterinaria no existe. No se ha agregado el paciente.');
            return null;
        }

        if (!GestorVeterinarias.clientes.find((c) => c.id === idCliente)) {
            console.log('El cliente no existe. No se ha agregado el paciente.');
            return null;
        }

        GestorVeterinarias.pacientes.push(nuevaMascota);
        return nuevaMascota;
    }

    bajaPaciente(paciente: Paciente) {
        const index = GestorVeterinarias.pacientes.findIndex((p) => p.id === paciente.id);
        if (index !== -1) {
            GestorVeterinarias.pacientes.splice(index, 1);
            console.log(`Paciente con ID ${paciente.id} ha sido dado de baja.`);
        } else {
            console.log(`No se encontró un paciente con ID ${paciente.id}.`);
        }
    }

    getProveedores(id: number | null, nombre: string, direccion: string, telefono: string, veterinariaId: number) {
        if (id) {
            // Si se proporciona un ID de proveedor, busca el proveedor por ID y, opcionalmente, el ID de la veterinaria
            if (veterinariaId) {
                return GestorVeterinarias.proveedores.find((proveedor) => proveedor.id === id && proveedor.veterinariaId === veterinariaId);
            } else {
                return GestorVeterinarias.proveedores.find((proveedor) => proveedor.id === id);
            }
        }

        // Si no se proporciona un ID de proveedor, devuelve una lista de todos los proveedores
        if (veterinariaId) {
            return GestorVeterinarias.proveedores.filter((proveedor) => proveedor.veterinariaId === veterinariaId);
        } else {
            return GestorVeterinarias.proveedores;
        }

    }

    altaProveedor(id: number | null, nombre: string, direccion: string, telefono: string, veterinariaId: number) {
        const nuevoProveedor = new Proveedor(id!, nombre, telefono, direccion, veterinariaId);

        if (!GestorVeterinarias.veterinarias.find((v) => v.id === veterinariaId)) {
            console.log('La veterinaria no existe. No se ha agregado el proveedor.');
            return null;
        }

        GestorVeterinarias.proveedores.push(nuevoProveedor);
        return nuevoProveedor;

    }

    bajaProveedor(proveedor: Proveedor) {
        const index = GestorVeterinarias.proveedores.findIndex((p) => p.id === proveedor.id);
        if (index !== -1) {
            GestorVeterinarias.proveedores.splice(index, 1);
            console.log(`Proveedor con ID ${proveedor.id} ha sido dado de baja.`);
        } else {
            console.log(`No se encontró un proveedor con ID ${proveedor.id}.`);
        }
    }
}
