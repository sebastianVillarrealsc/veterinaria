export class Proveedor {
    constructor(public id: number, public nombre: string, public teléfono: string) { }

    modificarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }

    modificarTeléfono(nuevoTeléfono: string) {
        this.teléfono = nuevoTeléfono;
    }
}
