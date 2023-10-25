import * as readline from 'readline';
import { GestorVeterinarias } from '../servicio/gestor';

export const menuClientes = (rl: readline.Interface, gestor: GestorVeterinarias) => {
    console.log('\n--- Menú de Administración de Clientes ---');
    console.log('1. Listar Clientes');
    console.log('2. Agregar Cliente');
    console.log('3. Modificar Cliente');
    console.log('4. Eliminar Cliente');
    console.log('5. Volver al Menú Principal');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                const clientes = gestor.getClientes();
                console.log('Clientes:');
                if (clientes.length === 0) {
                    console.log('No hay clientes registrados.');
                } else {
                    clientes.forEach((cliente) => {
                        console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre}`);
                    });
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

                            menuClientes(rl, gestor); // Volver al menú de clientes
                        });
                    });
                });
                break;
            case '3':
                // Lógica para modificar un cliente
                // ... (código para modificar un cliente)
                menuClientes(rl, gestor); // Volver al menú de clientes
                break;
            case '4':
                // Lógica para eliminar un cliente
                // ... (código para eliminar un cliente)
                menuClientes(rl, gestor); // Volver al menú de clientes
                break;
            case '5':
                // Volver al menú principal
                return;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuClientes(rl, gestor); // Volver al menú de clientes
                break;
        }
    });
};
