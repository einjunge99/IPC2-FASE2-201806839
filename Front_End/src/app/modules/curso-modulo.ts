export class Curso{
    cod_CURSO: number;
    nombre: string;
    descripcion: string;
    archivo:string;
    completa:string;
    fechaLimite:string;
    constructor(nombre:string,descripcion:string){
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}