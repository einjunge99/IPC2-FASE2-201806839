import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/usuario-modulo';
import { actividadServicio } from 'src/app/services/actividad-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nota-actividad',
  templateUrl: './nota-actividad.component.html',
  styleUrls: ['./nota-actividad.component.css']
})
export class NotaActividadComponent implements OnInit {

  registroAlumnos:Usuario[]=[];
  registroNotaAlumnos:Usuario[]=[];


  
codCurso: number;
 codActividad:number;
  primerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,private _actividadServicio: actividadServicio, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.primerForm = this.formBuilder.group({
      nota: [''],
    });

    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');
    this.codActividad = +this._route.snapshot.paramMap.get('act');

    this._actividadServicio.getActividadEstudiantes(this.codCurso,this.codActividad).subscribe(a => {
      this.registroAlumnos = a
    });
    this._actividadServicio.getActividadNotaEstudiantes(this.codCurso,this.codActividad).subscribe(b => {
      this.registroNotaAlumnos = b
    });
  }
  get ff() { return this.primerForm.controls; }

  agregarNota(usuario:string){
   this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else{
      var nota=this.primerForm.value.nota;
      if(nota==""){
        nota=0;
      }
      this._actividadServicio.addNotaUsuario(this.codActividad,nota,usuario)
      .subscribe((result) => {
        console.log(result);
      });
    }
  }
  actualizarNota(usuario:string){
    this.submitted = true;
     if (this.primerForm.invalid) {
       return;
     }
     else{
       var nota=this.primerForm.value.nota;
       if(nota==""){
         nota=0;
       }
       this._actividadServicio.addActualizarNota(this.codActividad,nota,usuario)
       .subscribe((result) => {
         console.log(result);
       });
     }
   }

}
