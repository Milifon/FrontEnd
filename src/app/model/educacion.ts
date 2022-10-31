export class Educacion {
    id?: number;
    titulo: String;
    institucion: String;
    periodo: String;
    img: String;

    constructor(titulo: String, institucion: String, periodo: String, img: String){
        
        this.titulo = titulo;
        this.institucion = institucion;
        this.periodo = periodo;
        this.img = img;
    }
}