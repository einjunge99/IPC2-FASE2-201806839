import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Foro_A } from 'src/app/modules/foro-asignacion';
import { foroServicio } from 'src/app/services/foro-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { Foro } from 'src/app/modules/foro-modelo';

declare var $: any;
@Component({
  selector: 'app-foro-estudiante',
  templateUrl: './foro-estudiante.component.html',
  styleUrls: ['./foro-estudiante.component.css']
})
export class ForoEstudianteComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _foroServicio: foroServicio, private _router: Router, private _route: ActivatedRoute) { }

  primerForm: FormGroup;
  submitted = false;
  segundoForm: FormGroup;
  submitted2 = false;
  mensajes: Foro_A[] = [];
  respuestas: Foro_A[] = [];
  detalles: Foro[] = [];

codForo: number;
 codUsuario: number;
completo: string;


  ngOnInit() {
  
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codForo = +this._route.snapshot.paramMap.get('cod');

    this._foroServicio.getDetalles(this.codForo).subscribe(a => {
      this.detalles = a
    });
    this._foroServicio.getRespuestas().subscribe(a => {
      this.respuestas = a
    });
    this._foroServicio.getMensajes(this.codForo).subscribe(a => {
      this.mensajes = a
      this.mensajes.forEach(element => {
        element.activo=false;
      });
    });
    

    let current_datetime = new Date()
    this.completo = current_datetime.getFullYear() + "/" + this.appendLeadingZeroes(current_datetime.getMonth() + 1) + "/" + this.appendLeadingZeroes(current_datetime.getDate()) + " " + this.appendLeadingZeroes(current_datetime.getHours()) + ":" + this.appendLeadingZeroes(current_datetime.getMinutes() + ":" + this.appendLeadingZeroes(current_datetime.getSeconds()));
    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
    this.segundoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  
  toggle(data) {
    this.segundoForm.reset();
    data.activo = !data.activo;
  }

  mensaje(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      this._foroServicio.addMensaje(this.primerForm.value.nombre, this.completo, this.codUsuario, this.codForo)
        .subscribe((result) => {
        this.mensajes=null;
          this._foroServicio.getMensajes(this.codForo).subscribe(a => {
            this.mensajes = a
            this.mensajes.forEach(element => {
              element.activo=false;
            });
          });
        });
        this.primerForm.reset();
        this.submitted=false;
    }
  }
  get ff() { return this.primerForm.controls; }
  get f() { return this.segundoForm.controls; }

  respuesta(cod_mensaje: number): void {
    this.submitted2 = true;
    if (this.segundoForm.invalid) {
      return;
    }
    else {
      this._foroServicio.addRespuesta(this.segundoForm.value.nombre, this.completo, this.codUsuario, cod_mensaje)
        .subscribe((result) => {
          this.respuestas=null;
          this._foroServicio.getRespuestas().subscribe(a => {
            this.respuestas = a
          });
        });
        this.segundoForm.reset();
        this.submitted2=false;
    }
  }


  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }


}

