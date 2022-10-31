export class Experiencia {
    id?: number;
    empleado: String;
    empresa: String;
    periodo: String;
    descripcion: String;
    img: String;

    constructor(empleado: String, empresa: String, periodo: String, descripcion: String, img: String){
        
        this.empleado = empleado;
        this.empresa = empresa;
        this.periodo = periodo;
        this.descripcion = descripcion;
        this.img = img;
    }
}