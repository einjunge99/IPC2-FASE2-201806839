import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert';
import { foroServicio } from 'src/app/services/foro-servicio';
import { Foro } from 'src/app/modules/foro-modelo';
@Component({
  selector: 'app-foro-crear',
  templateUrl: './foro-crear.component.html',
  styleUrls: ['./foro-crear.component.css']
})
export class ForoCrearComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private _foroServicio: foroServicio, private _router: Router, private _route: ActivatedRoute) { }


  primerForm: FormGroup;
  submitted = false;
  foros:Foro[]=[]

codCurso: number;
 codUsuario: number;


  ngOnInit() {

    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');

    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', [Validators.required]],
      limite: ['', [Validators.required]],
      contenido:['',[Validators.required]]
    });
    this._foroServicio.getForo(this.codCurso).subscribe(a => {
      this.foros = a
    });
  }
  get ff() { return this.primerForm.controls; }
  agregarForo(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else{

      swal("Ticket registrado!", {
        icon: "success",
      });
      var titulo=this.primerForm.value.nombre;
      var fecha=this.primerForm.value.fecha;
      var limite=this.primerForm.value.limite;
      var descripcion=this.primerForm.value.contenido;

      this._foroServicio.addForo(titulo,descripcion,fecha,limite,this.codCurso)
        .subscribe((result) => {
          this.foros=null;
          this._foroServicio.getForo(this.codCurso).subscribe(a => {
            this.foros = a
          });
        });;
 
    }
  }
  
  mensajes(asignacion:string){
     
    this._router.navigate(['login/auxiliar/'+this.codUsuario+'/actividades/foro/'+this.codCurso+'/mensajes',asignacion])

  }

}
