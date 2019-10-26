import {Injectable} from '@angular/core';
import {Curso} from '../modules/curso-modulo';
import {Curso_asignacion} from '../modules/curso_asignacion-modelo';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {  Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class cursoServicio{

    constructor(private http: HttpClient){

    }

    addCurso(nombre:string,descripcion:string){
        var data :Curso = new Curso(nombre,descripcion);
        return this.http.post<Curso>('http://localhost:4000/agregarCurso',data,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }

    addCursoDetalle(semestre:number,seccion:string,inicio:string,fin:string,anio:number,cod:string){
        var data :Curso_asignacion = new Curso_asignacion(semestre,seccion,inicio,fin,anio,cod);       
        return this.http.post<Curso_asignacion>('http://localhost:4000/agregarCursoDetalle',data,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }


    getCurso(): Observable<Curso[]> { 
        return this.http.get<Curso[]>('http://localhost:4000/obtenerCurso');  
    }
    getCurso2(): Observable<Curso[]> { 
        return this.http.get<Curso[]>('http://localhost:4000/obtenerCurso2');  
    }

    getCurso3(codigo:number): Observable<Curso[]> { 
        return this.http.get<Curso[]>('http://localhost:4000/obtenerCurso3/'+codigo);  
    }

  

    getCursoUsuario(codigo:number): Observable<Curso[]> { 
        return this.http.get<Curso[]>('http://localhost:4000/obtenerCursoUsuario/'+codigo);  
    }

    getTodos(): Observable<Curso_asignacion[]> { 
        return this.http.get<Curso_asignacion[]>('http://localhost:4000/cursos');  
    }    

    getAnios(): Observable<Curso_asignacion[]> { 
        return this.http.get<Curso_asignacion[]>('http://localhost:4000/anios');  
    }  

    getComprobar(semestre:string,seccion:string,anio:string,cod:string): Observable<Curso_asignacion[]> { 
        return this.http.get<Curso_asignacion[]>('http://localhost:4000/comprobar/'+semestre+'/'+seccion+'/'+cod+'/'+anio);  
    }    

    getComprobarCodigo(codigo:string): Observable<Curso[]> { 
        return this.http.get<Curso[]>('http://localhost:4000/comprobarCodigo/'+codigo);  
    }   

    getComprobarAlumnos(cod:string): Observable<Curso_asignacion[]> { 
        return this.http.get<Curso_asignacion[]>('http://localhost:4000/AlumnosValidar/'+cod);  
    }    

    getFechaLimite(): Observable<Curso[]> { 
        return this.http.get<Curso[]>('http://localhost:4000/fechaLimite');  
    }    


    eliminarCurso(codigo:string){
        return this.http.post<Curso>('http://localhost:4000/eliminarAsignacion/'+codigo,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }

    updateLimite(fecha:string){
        return this.http.post<Curso>('http://localhost:4000/actualizarLimite/'+fecha,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }



 




}
