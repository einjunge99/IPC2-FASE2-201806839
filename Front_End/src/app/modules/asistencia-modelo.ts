export class Asistencia{
    cod_ASISTENCIA:number;
    estado:string;
    fecha:string;
    fk_cod_USUARIO:number;
    fk_cod_ASIGNACION:number;
    constructor(fecha:string, user:number,curso:number){
        this.fecha=fecha;
        this.fk_cod_ASIGNACION=curso;
        this.fk_cod_USUARIO=user;
    } 

}