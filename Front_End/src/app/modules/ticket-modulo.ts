export class Ticket{
    cod_TICKET: number;
    asunto: string;
    contenido: string;
    estado:string;
    fk_cod_USUARIO:number;
    fk_cod_ASIGNACION:number;
    accion:string;
    //---------para recuperar consulta-----------//
    descripcion:string;
    seccion:string;
    nombre:string;
    carne:string;
    constructor(asunto:string, contenido:string,estado:string,fk_cod_USUARIO:number,fk_cod_ASIGNACION:number){
       this.asunto=asunto;
       this.contenido=contenido;
       this.estado=estado;
       this.fk_cod_ASIGNACION=fk_cod_ASIGNACION;
       this.fk_cod_USUARIO=fk_cod_USUARIO;
    }
}