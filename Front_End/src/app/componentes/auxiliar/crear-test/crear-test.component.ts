import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Evaluacion } from 'src/app/modules/evaluaciones-modulo';

import swal from 'sweetalert';
import { evaluacionServicio } from 'src/app/services/evaluacion-servicio';

declare var $: any;
@Component({
  selector: 'app-crear-test',
  templateUrl: './crear-test.component.html',
  styleUrls: ['./crear-test.component.css']
})
export class CrearTestComponent implements OnInit {

  constructor(private _evaluacionServicio: evaluacionServicio, private formBuilder: FormBuilder, private _router: Router, private _route: ActivatedRoute) { }


  primerForm: FormGroup;
  submitted = false;
  evaluacion: Evaluacion[] = []

 codCurso: number;
  codUsuario: number;

  ngOnInit() {

    var white = false
    var bgcolor;
    $(".prueba").click(function () {

      $(this).text(function (i, text) {
        return text === "N" ? "A" : "N";
      })

      if (white = !white) {
        bgcolor = $(this).css('backgroundColor');
        $(this).css("background-color", 'green');
      } else {
        $(this).css("background-color", bgcolor);
      }
    });
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');
    this._evaluacionServicio.getEvaluacion(this.codCurso).subscribe(a => {
      this.evaluacion = a
    });

    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  get ff() { return this.primerForm.controls; }

  agregarEvaluacion(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {

      swal("Evaluación registrada!", {
        icon: "success",
      });
      var titulo = this.primerForm.value.nombre;
      var estado = $('.prueba').text();
      this._evaluacionServicio.addEvaluacion(titulo, this.codCurso, estado)
        .subscribe((result) => {
          this.evaluacion = null;
          this._evaluacionServicio.getEvaluacion(this.codCurso).subscribe(a => {
            this.evaluacion = a
            this.primerForm.reset();
          });
        });;
      this.submitted = false;
    }
  }
  estado(cod: number, estado: string) {

    var cambio: string;
    if (estado == 'ACTIVAR') {
      cambio = 'DESHABILITAR'
    }
    else {
      cambio = 'ACTIVAR'
    }
    this._evaluacionServicio.updateEvaluacion(cod, cambio)
      .subscribe((result) => {
        this.evaluacion = null;
        this._evaluacionServicio.getEvaluacion(this.codCurso).subscribe(a => {
          this.evaluacion = a
        });
      });;
  }

  preguntas(asignacion: string) {
    this._router.navigate(['login/auxiliar/' + this.codUsuario + '/actividades/test/' + this.codCurso + '/pregunta', asignacion])
  }



}
