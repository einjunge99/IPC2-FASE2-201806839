export class Usuario {
    cod_USUARIO: number;
    nombre: string;
    carne: number;
    contra: string;
    correo: string;
    fk_cod_ROL: number;
    //---------para devolver el rol------//
    descripcion: string;
    //---------para devolver atributos de la actividad------//
    archivo:string;
    contenido:string;
    nota:number;
    estado:string;
    cod_ASISTENCIA:number;

    constructor(nombre: string, carne: number, contra: string, correo: string, fk_cod_ROL: number) {
        this.nombre = nombre;
        this.carne = carne;
        this.contra = contra;
        this.correo = correo;
        this.fk_cod_ROL = fk_cod_ROL;
    }
}