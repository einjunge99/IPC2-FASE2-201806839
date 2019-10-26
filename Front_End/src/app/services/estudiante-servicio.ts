import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {  Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../modules/usuario-modulo';
import { Curso_asignacion } from '../modules/curso_asignacion-modelo';


@Injectable()
export class estudianteServicio{

    constructor(private http: HttpClient){ }

getAux(): Observable<Usuario[]> { 
    return this.http.get<Usuario[]>('http://localhost:4000/obtenerAux');  
}

getBusqueda(codigo:number): Observable<Usuario[]>{ 
    return this.http.get<Usuario[]>('http://localhost:4000/busquedaAux/'+codigo);
}
getHorario(codigo:string,id:number): Observable<Curso_asignacion[]>{ 
    return this.http.get<Curso_asignacion[]>('http://localhost:4000/busquedaHorario_E/'+codigo+'/'+id);
}
getSeccion(codigo:string,inicio:string,fin:string,id:number): Observable<Curso_asignacion[]>{ 
    return this.http.get<Curso_asignacion[]>('http://localhost:4000/busquedaSeccion_E/'+codigo+'/'+inicio+'/'+fin+'/'+id);
}


addAsignacion(codigo:number,inicio:string,fin:string,seccion:string,usuario:number){
    return this.http.post('http://localhost:4000/agregarDetalle/'+codigo+'/'+inicio+'/'+fin+"/"+seccion+"/"+usuario,{
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    }).pipe(catchError(err => {
        console.error('Error: '+err);
        return throwError(err);
    }));
}

eliminar(user:number,codigo:number,inicio:string,fin:string,seccion:string){
    return this.http.post('http://localhost:4000/eliminarDetalle/'+user+'/'+codigo+'/'+inicio+'/'+fin+"/"+seccion,{
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    }).pipe(catchError(err => {
        console.error('Error: '+err);
        return throwError(err);
    }));
}

}