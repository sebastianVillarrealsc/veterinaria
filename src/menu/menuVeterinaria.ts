import readline from 'readline';
import { menuPrincipal } from '../../index';
import { Veterinaria } from "../entidades/veterinaria";

const veterinarias: Veterinaria[] = []; // Crea un arreglo para almacenar veterinarias

export const menuVeterinarias = (rl: readline.Interface) => {
    console.log('\n--- Menú de Administración de Veterinarias ---');
    console.log('1. Listar Veterinarias');
    console.log('2. Agregar Veterinaria');
    console.log('3. Dar de Baja Veterinaria');
    console.log('9. Volver al Menú Principal');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                // Lógica para listar todas las veterinarias
                console.log('Veterinarias:');
                if (veterinarias.length === 0) {
                    console.log('No hay veterinarias registradas.');
                } else {
                    veterinarias.forEach((veterinaria) => {
                        console.log(`ID: ${veterinaria.id}, Nombre: ${veterinaria.nombre}`);
                    });
                }
                menuVeterinarias(rl); // Volver al menú de veterinarias
                break;
            case '2':
                // Lógica para agregar una nueva veterinaria
                menuVeterinarias(rl); // Volver al menú de veterinarias
                break;
            case '3':
                // Lógica para dar de baja una veterinaria
                menuVeterinarias(rl);
                break;
            case '9':
                menuPrincipal();
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuVeterinarias(rl);
                break;
        }
    });
};
