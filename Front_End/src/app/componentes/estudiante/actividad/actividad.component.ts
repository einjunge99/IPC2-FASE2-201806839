import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/modules/curso-modulo';
import { cursoServicio } from 'src/app/services/curso-servicio';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class Actividad2Component implements OnInit {

  constructor(private _cursoServicio: cursoServicio, private _router: Router, private _route: ActivatedRoute) { }

  registroAsignados: Curso[] = [];
  codUsuario: number;

  ngOnInit() {
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this._cursoServicio.getCursoUsuario(this.codUsuario).subscribe(a => {
      this.registroAsignados = a
    });
  }
  navegar(asignacion:string){
     
    this._router.navigate(['login/estudiante/'+this.codUsuario+'/actividad/entrega',asignacion])
  }

  ticket(asignacion:string){
     
    this._router.navigate(['login/estudiante/'+this.codUsuario+'/actividad/ticket',asignacion])
  }
  foro(asignacion:string){
     
    this._router.navigate(['login/estudiante/'+this.codUsuario+'/actividad/foro',asignacion])
  }

}
