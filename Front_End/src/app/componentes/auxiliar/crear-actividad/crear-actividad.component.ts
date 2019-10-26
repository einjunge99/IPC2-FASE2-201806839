import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { actividadServicio } from 'src/app/services/actividad-servicio';

import * as $ from 'jquery';
import { Actividad } from 'src/app/modules/actividad-modulo';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _actividadServicio: actividadServicio, private _router: Router, private _route: ActivatedRoute) { }

  primerForm: FormGroup;
  submitted = false;
  actividades:Actividad[]=[]

  codCurso: number;
  codUsuario:number;

  ngOnInit() {
    
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');
    this._actividadServicio.getActividad(this.codCurso).subscribe(a => {
      this.actividades = a
    });
    
    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', [Validators.required]],
      limite: ['', [Validators.required]],
      ponderacion: ['', [Validators.required]],
      archivo: [''],
    });
  }



  get ff() { return this.primerForm.controls; }

  nota(actividad:string){
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/crear/'+this.codCurso+'/nota',actividad])
  }

  agregarActividad(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      var checkbox;
      if(this.primerForm.value.archivo=='TRUE'){
        checkbox="true";
      }
      else{
        checkbox="false"
      }
      this._actividadServicio.addActividad(this.primerForm.value.nombre, this.primerForm.value.ponderacion, this.primerForm.value.limite, this.primerForm.value.fecha, checkbox, this.codCurso)
        .subscribe((result) => {
          this.actividades=null;
          this._actividadServicio.getActividad(this.codCurso).subscribe(a => {
            this.actividades = a
          });
        
        });
    }
  }
}



