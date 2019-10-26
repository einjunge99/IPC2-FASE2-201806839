import {Injectable} from '@angular/core';
import {Usuario} from '../modules/usuario-modulo';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {  Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class registroServicio{

    constructor(private http: HttpClient){

    }

    addUsuario(nombre:string,carne:number,contra:string,correo:string,rol:number){
        var data :Usuario = new Usuario(nombre,carne,contra,correo,rol);
        return this.http.post<Usuario>('http://localhost:4000/agregarUsuario',data,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }

    getUsuarios(): Observable<Usuario[]> { 
        return this.http.get<Usuario[]>('http://localhost:4000/usuarios');  
    }

}
