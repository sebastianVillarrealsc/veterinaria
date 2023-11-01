export class Paciente {
    private static lastId: number = 0;

    constructor(public id: number, public nombre: string, public especie: string, public peso: string, public sexo: string, public color: string, public idVeterinaria: number, public idCliente: number) {
        if (!id) {
            this.id = ++Paciente.lastId;
        }
    }

    modificarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }

    modificarEspecie(nuevaEspecie: string) {
        this.especie = nuevaEspecie;
    }

    modificarPeso(nuevoPeso: string) {
        this.peso = nuevoPeso;
    }

    modificarSexo(nuevoSexo: string) {
        this.sexo = nuevoSexo;
    }

    modificarColor(nuevoColor: string) {
        this.color = nuevoColor;
    }

    modificarIdVeterinaria(nuevaIdVeterinaria: number) {
        this.idVeterinaria = nuevaIdVeterinaria;
    }

    modificarIdCliente(nuevaIdCliente: number) {
        this.idCliente = nuevaIdCliente;
    }
}