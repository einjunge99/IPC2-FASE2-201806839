import { Component, OnInit } from '@angular/core';
import { evaluacionServicio } from 'src/app/services/evaluacion-servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Evaluacion } from 'src/app/modules/evaluaciones-modulo';
import swal from 'sweetalert';
import { Pregunta } from 'src/app/modules/pregunta-evaluacion';

declare var $: any;
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {


  constructor(private _evaluacionServicio: evaluacionServicio, private formBuilder: FormBuilder, private _router: Router, private _route: ActivatedRoute) { }


  primerForm: FormGroup;
  submitted = false;
  evaluacion: Evaluacion[] = [];
  preguntas: Pregunta[] = []

  codCurso: number;
codUsuario: number;
  codEvaluacion: number;

  ngOnInit() {

    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
    var white = false
    var bgcolor;
    $(".prueba").click(function () {
      
      $(this).text(function (i, text) {
        return text === "V" ? "F" : "V";
      })



      if (white = !white) {
        bgcolor = $(this).css('backgroundColor');
        $(this).css("background-color", "#DE6262");
      } else {
        $(this).css("background-color", bgcolor);
      }
    });

    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');
    this.codEvaluacion = +this._route.snapshot.paramMap.get('cod');
    this._evaluacionServicio.getPregunta(this.codEvaluacion).subscribe(a => {
      this.preguntas = a
    });


  }
  
  get ff() { return this.primerForm.controls; }

  agregarPregunta(): void {

    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {

      var desc = this.primerForm.value.nombre;
      var estado=$('.prueba').text();
      this._evaluacionServicio.addPregunta(desc, estado, this.codEvaluacion)
        .subscribe((result) => {
          this.preguntas = null;
          this._evaluacionServicio.getPregunta(this.codEvaluacion).subscribe(a => {
            this.preguntas = a
          });

        });;
    }
  }




}
