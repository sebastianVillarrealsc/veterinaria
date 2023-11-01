export class Proveedor {
    private static lastId: number = 0;

    constructor(public id: number, public nombre: string, public dirección: string, public telefono: string, public veterinariaId: number) {
        if (!id) {
            this.id = ++Proveedor.lastId;
        }
    }

    modificarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }

    modificarDireccion(nuevaDirección: string) {
        this.dirección = nuevaDirección;
    }

    modificarTelefono(nuevoTeléfono: string) {
        this.telefono = nuevoTeléfono;
    }
}
