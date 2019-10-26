import { Injectable } from '@angular/core';
import { Usuario } from '../modules/usuario-modulo';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../modules/ticket-modulo';
import { Foro } from '../modules/foro-modelo';
import { Foro_A } from '../modules/foro-asignacion';
import { Respuesta } from '../modules/asignacion-respuesta';


@Injectable()
export class foroServicio {

    constructor(private http: HttpClient) { }

    //-------------------------------------------------------------//
    //---------------------ESTO ES PARA LOS CHATS------------------//
    //-------------------------------------------------------------//

    
    getChat(curso: number): Observable<Foro[]> {
        return this.http.get<Foro[]>('http://localhost:4000/obtenerChats/' + curso);
    }

    getAuxChat(curso: number): Observable<Foro_A[]> {
        return this.http.get<Foro_A[]>('http://localhost:4000/obtenerAuxChat/' + curso);
    }


    //-------------------------------------------------------------//
    //----------------------ESTO ES PARA LOS FOROS-----------------//
    //-------------------------------------------------------------//


    addForo(titulo: string, descripcion: string, fecha: string, limite: string, fk_cod_ASIGNACION: number) {
        var data: Foro = new Foro(titulo, descripcion, fecha, limite, fk_cod_ASIGNACION);

        return this.http.post<Foro>('http://localhost:4000/agregarForo', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }

    getForo(curso: number): Observable<Foro[]> {
        return this.http.get<Foro[]>('http://localhost:4000/obtenerForo/' + curso);
    }
    getDetalles(curso: number): Observable<Foro[]> {
        return this.http.get<Foro[]>('http://localhost:4000/obtenerForoDatos/' + curso);
    }

    //-----------------------esto es para los mensajes--------------//

    addMensaje(comentario: string, completo: string, fk_cod_USUARIO: number, fk_cod_FORO: number) {
        var data: Foro_A = new Foro_A(comentario, completo, fk_cod_USUARIO, fk_cod_FORO);
        return this.http.post<Foro_A>('http://localhost:4000/agregarForoMensaje', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }

    getMensajes(foro: number): Observable<Foro_A[]> {
        return this.http.get<Foro_A[]>('http://localhost:4000/obtenerMensajesForo/' + foro);
    }

    //-----------------------esto es para los respuesta--------------//

    addRespuesta(comentario: string, completo: string, fk_cod_USUARIO: number, fk_cod_AFORO: number) {
        var data: Respuesta = new Respuesta(comentario, completo, fk_cod_USUARIO, fk_cod_AFORO);
        return this.http.post<Respuesta>('http://localhost:4000/agregarForoRespuesta', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);
        }));
    }
    getRespuestas(): Observable<Foro_A[]> {
        return this.http.get<Foro_A[]>('http://localhost:4000/obtenerRespuestas');
    }

}