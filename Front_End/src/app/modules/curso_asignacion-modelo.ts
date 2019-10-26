export class Curso_asignacion{
    cod_ASIGNACION: number;
    semestre: number;
    seccion:string;
    inicio:string;
    fin:string;
    anio:number;
    codigo:string;
    fk_cod_CURSO:number;

    nombre: string;
    descripcion:string;
    cod_CURSO:number;
    aux:string;

    constructor(semestre:number,seccion:string,inicio:string,fin:string,anio:number,codigo:string){
      this.semestre=semestre;
      this.seccion=seccion;
      this.inicio=inicio;
      this.fin=fin;
      this.anio=anio;
      this.codigo=codigo;
    }
}