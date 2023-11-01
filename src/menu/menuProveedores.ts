import { menuPrincipal } from "../..";
import * as readline from 'readline';
import { GestorVeterinarias } from "../servicio/gestor";

export const menuProveedores = (rl: readline.Interface, gestor: GestorVeterinarias) => {
    console.log('\n--- Menú de proveedores ---');
    console.log('1. Listar proveedores');
    console.log('2. Agregar proveedor');
    console.log('3. Modificar proveedor');
    console.log('4. Eliminar proveedor');
    console.log('9. Volver al Menú Principal');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                console.log('Proveedores:');
                if (GestorVeterinarias.proveedores.length === 0) {
                    console.log('No hay proveedores registrados.');
                } else {
                    GestorVeterinarias.proveedores.forEach((proveedor) => {
                        console.log(`ID: ${proveedor.id}, Nombre: ${proveedor.nombre}, Dirección: ${proveedor.dirección}`);
                    });
                }
                menuProveedores(rl, gestor);
                break;
            case '2':
                rl.question('Nombre del proveedor: ', (nombreProveedor) => {
                    rl.question('Dirección del proveedor: ', (direccionProveedor) => {
                        rl.question('Teléfono del proveedor: ', (telefonoProveedor) => {
                            rl.question('ID del veterinaria: ', (id) => {
                                const nuevoProveedor = gestor.altaProveedor(null, nombreProveedor, direccionProveedor, telefonoProveedor, parseInt(id));
                                console.log('Proveedor agregado con éxito.', nuevoProveedor);
                                menuProveedores(rl, gestor);
                            });
                        });
                    });
                });
                break;
            case '3':
                rl.question('ID del proveedor a modificar: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        const proveedorAModificar = GestorVeterinarias.proveedores.find((proveedor) => proveedor.id === idNumber);
                        if (proveedorAModificar) {
                            rl.question('Nuevo nombre del proveedor: ', (nuevoNombre) => {
                                rl.question('Nueva dirección del proveedor: ', (nuevaDireccion) => {
                                    rl.question('Nuevo teléfono del proveedor: ', (nuevoTelefono) => {
                                        proveedorAModificar.modificarNombre(nuevoNombre);
                                        proveedorAModificar.modificarDireccion(nuevaDireccion);
                                        proveedorAModificar.modificarTelefono(nuevoTelefono);
                                        console.log('Proveedor modificado con éxito.');
                                        menuProveedores(rl, gestor);
                                    });
                                });
                            });
                        } else {
                            console.log('No se encontró un proveedor con ID ' + idNumber);
                            menuProveedores(rl, gestor);
                        }
                    } else {
                        console.log('ID no válido. Debe ser un número.');
                        menuProveedores(rl, gestor);
                    }
                });
                break;
            case '4':
                rl.question('ID del proveedor a eliminar: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        const proveedorAEliminar = GestorVeterinarias.proveedores.find((proveedor) => proveedor.id === idNumber);
                        if (proveedorAEliminar) {
                            gestor.bajaProveedor(proveedorAEliminar);
                            console.log('Proveedor eliminado con éxito.');
                            menuProveedores(rl, gestor);
                        } else {
                            console.log('No se encontró un proveedor con ID ' + idNumber);
                            menuProveedores(rl, gestor);
                        }
                    } else {
                        console.log('ID no válido. Debe ser un número.');
                        menuProveedores(rl, gestor);
                    }
                });
                break;
            case '9':
                menuPrincipal(); // Volver al menú principal
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuProveedores(rl, gestor); // Volver al menú principal
                break;
        }
    });
}
