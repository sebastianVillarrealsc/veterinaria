import { menuPrincipal } from "../..";
import { GestorVeterinarias } from "../servicio/gestor";
import * as readline from 'readline';

export const menuPacientes = (rl: readline.Interface, gestor: GestorVeterinarias) => {
    console.log('\n--- Menú de Administración de Pacientes ---');
    console.log('1. Listar Pacientes');
    console.log('2. Agregar Paciente');
    console.log('3. Modificar Paciente');
    console.log('4. Dar de Baja Paciente');
    console.log('9. Volver al Menú Principal');

    rl.question('Selecciona una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                console.log('Pacientes:');
                if (GestorVeterinarias.pacientes.length === 0) {
                    console.log('No hay pacientes registrados.');
                } else {
                    GestorVeterinarias.pacientes.forEach((paciente) => {
                        console.log(`ID: ${paciente.id}, Nombre: ${paciente.nombre}, Especie: ${paciente.especie}, Peso: ${paciente.peso}, Sexo: ${paciente.sexo}, Color: ${paciente.color}, ID de la Veterinaria: ${paciente.idVeterinaria}, ID del Cliente: ${paciente.idCliente}`);
                    });
                }
                menuPacientes(rl, gestor);
                break;
            case '2':
                rl.question('Nombre del paciente: ', (nombre) => {
                    rl.question('Especie del paciente: ', (especie) => {
                        rl.question('Peso del paciente: ', (peso) => {
                            rl.question('Sexo del paciente: ', (sexo) => {
                                rl.question('Color del paciente: ', (color) => {
                                    rl.question('ID de la veterinaria: ', (idVeterinaria) => {
                                        rl.question('ID del cliente: ', (idCliente) => {
                                            const nuevoPaciente = gestor.altaPaciente(null, nombre, especie, peso, sexo, color, parseInt(idVeterinaria), parseInt(idCliente)); // Pasa null como ID
                                            console.log('Paciente agregado con éxito.', nuevoPaciente);
                                            menuPacientes(rl, gestor);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case '3':
                rl.question('ID del paciente a modificar: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        const pacienteAModificar = GestorVeterinarias.pacientes.find((paciente) => paciente.id === idNumber);
                        if (pacienteAModificar) {
                            rl.question('Nuevo nombre del paciente: ', (nuevoNombre) => {
                                rl.question('Nueva especie del paciente: ', (nuevaEspecie) => {
                                    rl.question('Nuevo peso del paciente: ', (nuevoPeso) => {
                                        rl.question('Nuevo sexo del paciente: ', (nuevoSexo) => {
                                            rl.question('Nuevo color del paciente: ', (nuevoColor) => {
                                                rl.question('Nuevo ID de la veterinaria: ', (nuevoIdVeterinaria) => {
                                                    rl.question('Nuevo ID del cliente: ', (nuevoIdCliente) => {
                                                        pacienteAModificar.modificarNombre(nuevoNombre);
                                                        pacienteAModificar.modificarEspecie(nuevaEspecie);
                                                        pacienteAModificar.modificarPeso(nuevoPeso);
                                                        pacienteAModificar.modificarSexo(nuevoSexo);
                                                        pacienteAModificar.modificarColor(nuevoColor);
                                                        pacienteAModificar.modificarIdVeterinaria(parseInt(nuevoIdVeterinaria));
                                                        pacienteAModificar.modificarIdCliente(parseInt(nuevoIdCliente));
                                                        console.log('Paciente modificado con éxito.');
                                                        menuPacientes(rl, gestor);
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        } else {
                            console.log('No se encontró un paciente con ID ' + idNumber);
                            menuPacientes(rl, gestor);
                        }
                    } else {
                        console.log('ID no válido. Debe ser un número.');
                        menuPacientes(rl, gestor);
                    }
                });
                break;
            case '4':
                rl.question('ID del paciente a dar de baja: ', (id) => {
                    const idNumber = parseInt(id, 10);
                    if (!isNaN(idNumber)) {
                        const pacienteABorrar = GestorVeterinarias.pacientes.find((paciente) => paciente.id === idNumber);
                        if (pacienteABorrar) {
                            gestor.bajaPaciente(pacienteABorrar);
                            menuPacientes(rl, gestor);
                        } else {
                            console.log('No se encontró un paciente con ID ' + idNumber);
                            menuPacientes(rl, gestor);
                        }
                    } else {
                        console.log('ID no válido. Debe ser un número.');
                        menuPacientes(rl, gestor);
                    }
                });
                break;
            case '9':
                menuPrincipal();
                break;
            default:
                console.log('Opción no válida. Por favor, elige una opción válida.');
                menuPacientes(rl, gestor);
                break;
        }
    });
}
