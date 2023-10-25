import { menuClientes } from "./src/menu/menuClientes";
import { menuVeterinarias } from "./src/menu/menuVeterinaria";
import * as readline from 'readline';
import { GestorVeterinarias } from "./src/servicio/gestor";

const gestor = new GestorVeterinarias();

gestor.altaCliente('Juan', '123456789', false, 0, 1);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const menuPrincipal = () => {
    console.log('\n--- Menú Principal ---');
    console.log('1. Administrar Veterinarias');
    console.log('2. Administrar Clientes');
    console.log('3. Administrar Pacientes');
    console.log('4. Administrar Proveedores');
    console.log('9. Salir');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                menuVeterinarias(rl); // Entrar en el menú de veterinarias
                break;
            case '2':
                console.log('Opción no disponible aún.');
                menuClientes(rl, gestor); // Volver al menú principal
                break;
            case '3':
                console.log('Opción no disponible aún.');
                menuPrincipal(); // Volver al menú principal
                break;
            case '4':
                console.log('Opción no disponible aún.');
                menuPrincipal(); // Volver al menú principal
                break;
            case '9':
                console.log('Hasta luego. ¡Adiós!');
                rl.close(); // Cerrar el readline y salir
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuPrincipal(); // Volver al menú principal
                break;
        }
    });
};

menuPrincipal();
