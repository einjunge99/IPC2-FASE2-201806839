export class Foro {
    cod_FORO: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    limite: string;
    completa: string;
    activo:boolean;
    fk_cod_ASIGNACION: number;
    constructor(titulo: string, descripcion: string, fecha: string, limite: string, fk_cod_ASIGNACION: number) {
        this.titulo=titulo; 
        this.descripcion=descripcion;
        this.fecha=fecha;
        this.limite =limite;
        this.fk_cod_ASIGNACION =fk_cod_ASIGNACION;

    }


}