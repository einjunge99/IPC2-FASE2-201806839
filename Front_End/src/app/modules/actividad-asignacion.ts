export class Actividad_A{
    cod_ANOTA: number;
    contenido: string;
    nota:string;
    fk_cod_USUARIO:number;
    fk_cod_ACTIVIDAD:number
    constructor(contenido:string,nota:string,fk_cod_USUARIO:number,fk_cod_ACTIVIDAD:number){
        this.contenido=contenido;
        this.nota=nota;
        this.fk_cod_ACTIVIDAD=fk_cod_ACTIVIDAD;
        this.fk_cod_USUARIO=fk_cod_USUARIO;
    }
}