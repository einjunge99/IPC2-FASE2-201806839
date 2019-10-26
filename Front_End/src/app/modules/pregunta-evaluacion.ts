export class Pregunta{
    cod_PREGUNTA:number;
    descripcion:string;
    estado:string;
    fk_cod_EVALUACION:number;
    aleatorio:string;
    constructor(descripcion:string,estado:string,evaluacion:number){
        this.descripcion=descripcion;
        this.estado=estado;
        this.fk_cod_EVALUACION=evaluacion;

    }
}