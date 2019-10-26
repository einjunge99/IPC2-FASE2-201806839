export class Evaluacion_A{
    cod_TEST: number;
    nota:number;
    fk_cod_USUARIO:number;
    fk_cod_EVALUACION:number;
    constructor(user:number,asignacion:number){
        this.fk_cod_USUARIO=user;
        this.fk_cod_EVALUACION=asignacion;
    }
}