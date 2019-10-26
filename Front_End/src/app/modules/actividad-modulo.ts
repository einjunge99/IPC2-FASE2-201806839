export class Actividad{
    cod_ACTIVIDAD: number;
    descripcion: string;
    ponderacion:number;
    limite:string;
    fecha:string;
    archivo:string;
    completa:string;
    fk_cod_CURSO:number;

    //-------para capturar datos de consulta----//
    contenido:string;
    nota:string;
    constructor(descripcion:string,ponderacion:number,limite:string,fecha:string,archivo:string,fk_cod_CURSO:number){
      this.descripcion=descripcion;
      this.ponderacion=ponderacion;
      this.limite=limite;
      this.fecha=fecha;
      this.archivo=archivo;
      this.fk_cod_CURSO=fk_cod_CURSO;
    }
}