import { Component, OnInit } from '@angular/core';
import { cursoServicio } from 'src/app/services/curso-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/modules/curso-modulo';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  constructor(private _cursoServicio: cursoServicio, private _router: Router, private _route: ActivatedRoute) { }
  
  registroAsignados: Curso[] = [];
   codUsuario: number;
  

  ngOnInit() {
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this._cursoServicio.getCursoUsuario(this.codUsuario).subscribe(a => {
      this.registroAsignados = a
    });
  }

  agregar(asignacion:string){
     
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/crear',asignacion])

  }
  ticket(asignacion:string){
     
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/ticket',asignacion])

  }
  foro(asignacion:string){
     
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/foro',asignacion])

  }
  asistencia(asignacion:string){
     
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/asistencia',asignacion])

  }
  test(asignacion:string){
     
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/test',asignacion])

  }

}
