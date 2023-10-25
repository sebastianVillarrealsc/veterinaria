export class Paciente {
    constructor(public id: number, public nombre: string, public especie: 'perro' | 'gato' | 'exótica', public idDueño: number) { }

    modificarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }

    modificarEspecie(nuevaEspecie: 'perro' | 'gato' | 'exótica') {
        this.especie = nuevaEspecie;
    }
}
