import {Injectable} from '@angular/core';
import {Usuario} from '../modules/usuario-modulo';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {  Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from '../modules/ticket-modulo';


@Injectable()
export class ticketServicio{

    constructor(private http: HttpClient){}

    addTicket(asunto:string,contenido:string,usuario:number,asignacion:number){
    
        var data: Ticket = new Ticket(asunto,contenido,'RECIBIDO',usuario,asignacion);
        return this.http.post<Ticket>('http://localhost:4000/agregarTicket',data,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }

    getTicket(curso:number,user:number): Observable<Ticket[]> { 
        return this.http.get<Ticket[]>('http://localhost:4000/obtenerTicket/'+curso+'/'+user);  
    }

    getTicketAdmin(): Observable<Ticket[]> { 
        return this.http.get<Ticket[]>('http://localhost:4000/obtenerTicketAdmin');  
    }
    getTicketAtendido(): Observable<Ticket[]> { 
        return this.http.get<Ticket[]>('http://localhost:4000/obtenerTicketAtendido');  
    }

    getTicketAux(curso:number,user:number): Observable<Ticket[]> { 
        return this.http.get<Ticket[]>('http://localhost:4000/obtenerTicketAux/'+curso+'/'+user);  
    }

    updateTicketAdmin(codigo:string,accion:string){
        var data: Ticket = new Ticket(codigo,accion,'',0,0);
        return this.http.post<Ticket>('http://localhost:4000/actualizarTicketAdmin',data,{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }
    updateTicketEnviado(){
        return this.http.post('http://localhost:4000/actualizarTicketAdmin',{
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        }).pipe(catchError(err => {
            console.error('Error: '+err);
            return throwError(err);
        }));
    }

}