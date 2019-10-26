import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from '../modules/usuario-modulo';


@Injectable()
export class loginServicio{
    constructor(private http: HttpClient){}

login(username:string,password:string): Observable<Usuario[]>{
        return this.http.get<Usuario[]>('http://localhost:4000/login/'+username+"/"+password);
}
}