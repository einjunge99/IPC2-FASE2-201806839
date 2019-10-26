import { Injectable } from '@angular/core';
import { Usuario } from '../modules/usuario-modulo';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Evaluacion } from '../modules/evaluaciones-modulo';
import { Pregunta } from '../modules/pregunta-evaluacion';


@Injectable()
export class evaluacionServicio {
    constructor(private http: HttpClient) {
    }

    addEvaluacion(titulo: string, curso: number,aleatorio:string) {
        var data: Evaluacion = new Evaluacion(titulo, '', curso,aleatorio);
        return this.http.post<Evaluacion>('http://localhost:4000/agregarEvaluacion', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }


    updateEvaluacion(cod: number, estado: string) {
        return this.http.post<Evaluacion>('http://localhost:4000/actualizarEvaluacion/' + cod + '/' + estado, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }


    getEvaluacion(curso: number): Observable<Evaluacion[]> {
        return this.http.get<Evaluacion[]>('http://localhost:4000/obtenerEvaluacion/' + curso);
    }

    //-----------------------------ESTO ES PARA LAS PREGUNTAS-----------------//

    addPregunta(descripcion:string,estado:string,evaluacion:number) {
        var data: Pregunta = new Pregunta(descripcion,estado,evaluacion);
        return this.http.post<Pregunta>('http://localhost:4000/agregarPregunta', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }

    getPregunta(evaluacion: number): Observable<Pregunta[]> {
        return this.http.get<Pregunta[]>('http://localhost:4000/obtenerPreguntas/' + evaluacion);
    }


}
