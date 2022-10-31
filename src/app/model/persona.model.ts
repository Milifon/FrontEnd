export class Persona{
    id: number;
    nombre: String|null;
    descripcion: String|null;
    puesto: String|null;
    img: String|null;

    constructor(id: number, nombre: String|null, descripcion: String|null, puesto: String|null, img: String|null){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puesto = descripcion;
        this.img = img;
    }

    
}