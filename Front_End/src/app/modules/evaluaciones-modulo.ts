export class Evaluacion{
    cod_EVALUACION: number;
    titulo:string;
    estado:string;
    fk_cod_ASIGNACION:number;
    //----------esto es para leer el dato-----------//
    nota:number;
    aleatorio:string;
    constructor(titulo:string,estado:string,asignacion:number,aleatorio:string){
        this.titulo=titulo;
        this.estado=estado;
        this.fk_cod_ASIGNACION=asignacion;
        this.aleatorio=aleatorio;
    }
}