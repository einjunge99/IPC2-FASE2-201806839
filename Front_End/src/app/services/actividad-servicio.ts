import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Actividad } from '../modules/actividad-modulo';
import { Usuario } from '../modules/usuario-modulo';
import { Actividad_A } from '../modules/actividad-asignacion';
import { Evaluacion } from '../modules/evaluaciones-modulo';
import { Evaluacion_A } from '../modules/asignacion_evaluacion';


@Injectable()
export class actividadServicio {

    constructor(private http: HttpClient) {

    }

    addActividad(descripcion: string, ponderacion: number, limite: string, fecha: string, archivo: string, fk_cod_CURSO: number) {
        var data: Actividad = new Actividad(descripcion, ponderacion, limite, fecha, archivo, fk_cod_CURSO);
        return this.http.post<Actividad>('http://localhost:4000/agregarActividad', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }

    addNotaUsuario(actividad: number, nota: string, usuario: string) {
        return this.http.post<Actividad>('http://localhost:4000/agregarNotaUsuario/' + actividad + '/' + nota + '/' + usuario, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }

    addActualizarNota(actividad: number, nota: string, usuario: string) {
        return this.http.post<Actividad>('http://localhost:4000/actualizarNotaUsuario/' + actividad + '/' + nota + '/' + usuario, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }


    addEntregaUsuario(actividad: number, nota: string, usuario: number, contenido: string) {
        var data: Actividad_A = new Actividad_A(contenido, nota, usuario, actividad);
        return this.http.post<Actividad_A>('http://localhost:4000/agregarEntregaUsuario', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }



    getActividad(curso: number): Observable<Actividad[]> {
        return this.http.get<Actividad[]>('http://localhost:4000/obtenerActividad/' + curso);
    }
    getActividadEstudiantes(curso: number, actividad: number): Observable<Usuario[]> {
        return this.http.get<Usuario[]>('http://localhost:4000/obtenerEstudiantesActividad/' + curso + '/' + actividad);
    }

    getActividades(curso: number, estudiante: number): Observable<Actividad[]> {
        return this.http.get<Actividad[]>('http://localhost:4000/obtenerActividades/' + curso + '/' + estudiante);
    }

    //-----------este es para cuando quiero una nota de una actividad especifica con un estudiante especifico-----//
    getActividadNota(actividad: number, estudiante: number): Observable<Actividad[]> {
        return this.http.get<Actividad[]>('http://localhost:4000/obtenerEstudianteActividadNota/' + actividad + '/' + estudiante);
    }
    //-----------y esta es para cuando quiero las notas de todos los estudiantes-----//
    getActividadNotaEstudiantes(curso: number, actividad: number): Observable<Usuario[]> {
        return this.http.get<Usuario[]>('http://localhost:4000/obtenerEstudiantesActividadNota/' + curso + '/' + actividad);
    }

    //-----------------------------------------------------------//
    //--------si, lo se no deberia de ir ahi pero pos ya que-----//
    //-----------------------------------------------------------//


    //------------------------esto es para las evaluaciones en cada uno de los estudiantes-----------//

    getEvaluacion(curso: number, user: number): Observable<Evaluacion[]> {
        return this.http.get<Evaluacion[]>('http://localhost:4000/obtenerTestEstudiante/' + curso + '/' + user);
    }
    getNotaEvaluacion(curso: number, user: number): Observable<Evaluacion[]> {
        return this.http.get<Evaluacion[]>('http://localhost:4000/obtenerTestResult/' + curso + '/' + user);
    }

    getUsuario(test: number, user: number): Observable<Evaluacion[]> {
        return this.http.get<Evaluacion[]>('http://localhost:4000/obtenerTestEstudiante2/' + test + '/' + user);
    }


    addUsuario(test: number, user: number) {
        var data: Evaluacion_A = new Evaluacion_A(user, test);
        return this.http.post<Actividad_A>('http://localhost:4000/agregarTestUsuario', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }

    updateNota(test: number, user: number, nota:number) {
        return this.http.post<Actividad_A>('http://localhost:4000/actualizarTest/'+test+'/'+user+'/'+ nota, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }



}

