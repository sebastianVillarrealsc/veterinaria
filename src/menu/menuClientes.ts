import * as readline from 'readline';
import { GestorVeterinarias } from '../servicio/gestor';
import { menuPrincipal } from '../..';
import { Cliente } from '../entidades/cliente';

export const menuClientes = (rl: readline.Interface, gestor: GestorVeterinarias) => {
    console.log('\n--- Menú de Administración de Clientes ---');
    console.log('1. Listar Clientes');
    console.log('2. Agregar Cliente');
    console.log('3. Modificar Cliente');
    console.log('4. Eliminar Cliente');
    console.log('9. Volver al Menú Principal');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                const clientes = gestor.getClientes(null) ?? [];
                console.log('Clientes:');

                if (Array.isArray(clientes)) {
                    if (clientes.length === 0) {
                        console.log('No hay clientes registrados.');
                    } else {
                        for (const cliente of clientes) {
                            console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre}, Teléfono: ${cliente.telefono}, Veterinaria: ${cliente.veterinariaId}, Es VIP: ${cliente.esVIP}, Número de Visitas: ${cliente.numeroVisitas}`);
                            console.log(`Teléfono: ${cliente.telefono}`);
                            console.log(`Veterinaria: ${cliente.veterinariaId}`);
                            console.log(`Es VIP: ${cliente.esVIP}`);
                            console.log(`Número de Visitas: ${cliente.numeroVisitas}`);
                            console.log('--------------------------'); // Separador entre clientes
                        }
                    }
                }
                menuClientes(rl, gestor);
                break;
            case '2':
                rl.question('Nombre del cliente: ', (nombre) => {
                    rl.question('Teléfono del cliente: ', (telefono) => {
                        rl.question('ID de la veterinaria a la que asociar: ', (veterinariaId) => {
                            // Aquí tienes todos los detalles para crear el cliente
                            const cliente = gestor.altaCliente(nombre, telefono, false, 0, parseInt(veterinariaId));

                            if (cliente) {
                                console.log('Cliente agregado con éxito.');
                            } else {
                                console.log('La veterinaria no existe. El cliente no ha sido agregado.');
                            }
                            menuClientes(rl, gestor);
                        });
                    });
                });
                break;
            case '3':
                rl.question('ID del cliente a modificar (Presiona Enter para listar todos los clientes): ', (clienteId) => {
                    if (clienteId && clienteId.trim() !== '') {
                        const idNumber = parseInt(clienteId, 10);
                        if (!isNaN(idNumber)) {
                            const clienteAModificar = gestor.getClientes(idNumber);
                            if (clienteAModificar instanceof Cliente) {
                                console.log(`Cliente a modificar: ID: ${clienteAModificar.id}, Nombre: ${clienteAModificar.nombre}`);
                                rl.question('Nuevo nombre del cliente: ', (nuevoNombre) => {
                                    rl.question('Nuevo teléfono del cliente: ', (nuevoTelefono) => {
                                        rl.question('Nuevo ID de la veterinaria: ', (nuevaVeterinariaId) => {
                                            rl.question('Nueva mascota: ', (nuevaMascota) => {
                                                // Aquí tienes todos los detalles para modificar el cliente
                                                clienteAModificar.nombre = nuevoNombre;
                                                clienteAModificar.telefono = nuevoTelefono;
                                                clienteAModificar.veterinariaId = parseInt(nuevaVeterinariaId);
                                                clienteAModificar.mascotaId = parseInt(nuevaMascota);
                                                console.log('Cliente modificado con éxito.');
                                                menuClientes(rl, gestor);
                                            });
                                        });
                                    });
                                });
                            } else {
                                console.log('No se encontró un cliente con el ID proporcionado.');
                                menuClientes(rl, gestor);
                            }
                        } else {
                            console.log('ID no válido. Debe ser un número.');
                            menuClientes(rl, gestor);
                        }
                    } else {
                        // Cuando el usuario presiona Enter sin proporcionar un ID, muestra la lista de clientes.
                        const clientes = gestor.getClientes(null);
                        if (Array.isArray(clientes)) {
                            if (clientes.length > 0) {
                                console.log('Clientes:');
                                clientes.forEach((cliente) => {
                                    console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre}, Telefono: ${cliente.telefono}, Veterinaria: ${cliente.veterinariaId}, Es VIP: ${cliente.esVIP}, Número de Visitas: ${cliente.numeroVisitas}`);
                                });
                            } else {
                                console.log('No hay clientes registrados.');
                            }
                        } else {
                            console.log('Error al obtener la lista de clientes.');
                        }
                        menuClientes(rl, gestor);
                    }
                });
                break;
            case '4':
                rl.question('ID del cliente a eliminar: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        const cliente = gestor.getClientes(parseInt(id));
                        if (cliente instanceof Cliente) {
                            gestor.bajaCliente(cliente);
                        } else {
                            console.log(`No se encontró un cliente con ID ${idNumber}.`);
                        }
                    } else {
                        console.log('No hay clientes registrados.');
                    }

                    menuClientes(rl, gestor);
                });
                break;
            case '9':
                menuPrincipal();
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuClientes(rl, gestor);
                break;
        }
    });
};
