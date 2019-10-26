import { Component, OnInit } from '@angular/core';
import { cursoServicio } from 'src/app/services/curso-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/modules/curso-modulo';
import { foroServicio } from 'src/app/services/foro-servicio';
import { Foro } from 'src/app/modules/foro-modelo';
import { Foro_A } from 'src/app/modules/foro-asignacion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert';
declare var $: any;

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _foroServicio: foroServicio, private _cursoServicio: cursoServicio, private _router: Router, private _route: ActivatedRoute) { }

  registroAsignados: Curso[] = [];
  detalles: Foro[] = [];
  mensajes: Foro_A[] = [];

   codUsuario: number;
 completo: string;
 codForo: number;

  primerForm: FormGroup;
  submitted = false;
  seleccion = false;
  segundoForm: FormGroup;
  submitted2 = false;
  respuestas: Foro_A[] = [];



  ngOnInit() {

    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this._cursoServicio.getCursoUsuario(this.codUsuario).subscribe(a => {
      this.registroAsignados = a
    });

    this._foroServicio.getRespuestas().subscribe(a => {
      this.respuestas = a
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


  get ff() { return this.primerForm.controls; }
  get f() { return this.segundoForm.controls; }


  mostrar(asignacion: number) {
    this.detalles = null;
    this.seleccion = false;
    this.codForo = null;
    this._foroServicio.getChat(asignacion).subscribe(a => {
      this.detalles = a
      if (this.detalles.length != 0) {
        this.detalles.forEach(element => {
          element.activo = false;
        });
        this.seleccion = true;
        this.codForo = this.detalles[0].cod_FORO;
        this.mensajesChat(this.codForo)
      }
      else {
        this._foroServicio.addForo('', '', '', '', asignacion)
          .subscribe((result) => {
          });;
        this.mostrar(asignacion);
      }


    });
  }
  mensajesChat(foro: number) {
    this._foroServicio.getMensajes(foro).subscribe(a => {
      this.mensajes = a
      this.mensajes.forEach(element => {
        element.activo = false;
      });
    });

  }
  mensaje(): void {
    this.submitted = true;
    if (!this.seleccion) {
      swal("Heeeeey!", "Debes seleccionar un curso", "error")
    }
    else {
      this._foroServicio.addMensaje(this.primerForm.value.nombre, this.completo, this.codUsuario, this.codForo)
        .subscribe((result) => {
          this.codForo = this.detalles[0].cod_FORO;
          this.mensajes = null;
          this.mensajesChat(this.codForo)
        });


    }
  }

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
        this.submitted2=false;
        this.segundoForm.reset();
    }
  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }
  toggle(data) {
    this.segundoForm.reset();
    data.activo = !data.activo;
  }


}
