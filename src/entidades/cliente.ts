export class Cliente {
    private static lastId: number = 0; // Inicializamos el último ID en 0

    constructor(public id: number | null, public nombre: string, public telefono: string, public esVIP: boolean, public numeroVisitas: number, public veterinariaId: number) {
        if (id === null) {
            this.id = ++Cliente.lastId;
        }
    }

    modificarNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre;
    }

    modificarTeléfono(nuevoTeléfono: string) {
        this.telefono = nuevoTeléfono;
    }

    modificarEsVIP(nuevoEsVIP: boolean) {
        this.esVIP = nuevoEsVIP;
    }

    incrementarVisitas() {
        this.numeroVisitas++;
        if (this.numeroVisitas >= 5) {
            this.esVIP = true;
        }
    }
}
