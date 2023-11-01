import readline from 'readline';
import { menuPrincipal } from '../../index';
import { GestorVeterinarias } from '../servicio/gestor';

export const menuVeterinarias = (rl: readline.Interface, gestor: GestorVeterinarias) => {
    console.log('\n--- Menú de Administración de Veterinarias ---');
    console.log('1. Listar Veterinarias');
    console.log('2. Agregar Veterinaria');
    console.log('3. Modificar Veterinaria');
    console.log('4. Dar de Baja Veterinaria');
    console.log('9. Volver al Menú Principal');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                // Lógica para listar todas las veterinarias
                console.log('Veterinarias:');
                if (GestorVeterinarias.veterinarias.length === 0) {
                    console.log('No hay veterinarias registradas.');
                } else {
                    GestorVeterinarias.veterinarias.forEach((veterinaria) => {
                        console.log(`ID: ${veterinaria.id}, Nombre: ${veterinaria.nombre}, Dirección: ${veterinaria.dirección}`);
                    });
                }
                menuVeterinarias(rl, gestor);
                break;
            case '2':
                rl.question('Nombre de la veterinaria: ', (nombre) => {
                    rl.question('Dirección de la veterinaria: ', (direccion) => {
                        const nuevaVeterinaria = gestor.altaVeterinaria(null, nombre, direccion); // Pasa null como ID
                        console.log('Veterinaria agregada con éxito.', nuevaVeterinaria);
                        menuVeterinarias(rl, gestor);
                    });
                });
                break;
            case '3':
                rl.question('ID de la veterinaria a modificar: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        const veterinariaAModificar = GestorVeterinarias.veterinarias.find((veterinaria) => veterinaria.id === idNumber);
                        if (veterinariaAModificar) {
                            rl.question('Nuevo nombre de la veterinaria: ', (nuevoNombre) => {
                                rl.question('Nueva dirección de la veterinaria: ', (nuevaDireccion) => {
                                    veterinariaAModificar.modificarNombre(nuevoNombre);
                                    veterinariaAModificar.modificarDireccion(nuevaDireccion);
                                    console.log('Veterinaria modificada con éxito.');
                                    menuVeterinarias(rl, gestor);
                                });
                            });
                        } else {
                            console.log('No se encontró una veterinaria con ID ' + idNumber);
                            menuVeterinarias(rl, gestor);
                        }
                    } else {
                        console.log('ID no válido. Debe ser un número.');
                        menuVeterinarias(rl, gestor);
                    }
                });
                break;
            case '4':
                rl.question('ID de la veterinaria a dar de baja: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        gestor.bajaVeterinaria(idNumber);
                    } else {
                        console.log('ID no válido. Debe ser un número.');
                    }
                    menuVeterinarias(rl, gestor);
                });
                break;
            case '9':
                menuPrincipal();
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuVeterinarias(rl, gestor);
                break;
        }
    });
};
