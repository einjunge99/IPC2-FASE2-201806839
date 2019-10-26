export class Foro_A {
    cod_AFORO: number;
    comentario:string;
    fecha:string;
    fk_cod_USUARIO: number;
    fk_cod_FORO: number;
    //-----PARA EXTRAER DATOS----//
    nombre:string;
    carne:string;
    cod_USUARIO:string;
    activo:boolean;
    fk_cod_AFORO: number;

    constructor(comentario:string,completo:string,fk_cod_USUARIO:number,fk_cod_FORO:number) {
        this.comentario=comentario;
        this.fecha=completo;
        this.fk_cod_USUARIO=fk_cod_USUARIO;
        this.fk_cod_FORO=fk_cod_FORO;
    }
}