export class Respuesta{
    cod_RESPUESTA: number;
    comentario:string;
    fecha:string;
    fk_cod_USUARIO: number;
    fk_cod_AFORO: number;
    //-----PARA EXTRAER DATOS----//
    nombre:string;
    carne:string;
    cod_USUARIO:string;

    constructor(comentario:string,completo:string,fk_cod_USUARIO:number,fk_cod_AFORO:number) {
        this.comentario=comentario;
        this.fecha=completo;
        this.fk_cod_USUARIO=fk_cod_USUARIO;
        this.fk_cod_AFORO=fk_cod_AFORO;
    }


}