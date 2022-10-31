export class Proyecto {
    id?: number;
    nombre: String;
    descripcion: String;
    fecha: String;
    link: String;

    constructor(nombre: String, descripcion: String, fecha: String, link: String){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.link = link;
    }
}