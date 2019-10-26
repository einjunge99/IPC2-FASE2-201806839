import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../modules/usuario-modulo';
import { Asistencia } from '../modules/asistencia-modelo';
import { catchError } from 'rxjs/operators';


@Injectable()
export class asistenciaServicio {

    constructor(private http: HttpClient) { }

    addAsistencia(fecha:string,user:number,curso:number) {
        var data :Asistencia= new Asistencia(fecha,user,curso);       
        return this.http.post<Asistencia>('http://localhost:4000/agregarAsistencia', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);

        }));
    }

    updateAsistencia(asistencia:number,estado:string) {     
        return this.http.post<Asistencia>('http://localhost:4000/actualizarAsistencia/'+asistencia+'/'+estado, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: ' + err);
            return throwError(err);

        }));
    }

    
    getEstudiantesCurso(codigo:number,fecha:string): Observable<Usuario[]> { 
        return this.http.get<Usuario[]>('http://localhost:4000/obtenerEstudiantes/'+codigo+'/'+fecha);  
    }
    getAsistencias(codigo:number,fecha:string): Observable<Usuario[]> { 
        return this.http.get<Usuario[]>('http://localhost:4000/obtenerAsistentes/'+codigo+'/'+fecha);  
    }
}
