import { Component, OnInit } from '@angular/core';
import { Pregunta } from 'src/app/modules/pregunta-evaluacion';
import { evaluacionServicio } from 'src/app/services/evaluacion-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { actividadServicio } from 'src/app/services/actividad-servicio';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private _actividadServicio: actividadServicio, private _evaluacionServicio: evaluacionServicio, private _router: Router, private _route: ActivatedRoute) { }

   codCurso: number;
   codUsuario: number;
   codEvaluacion: number;
   idx: number;
   cantidad: number;
   cont: number;
   show: number;


  preguntas: Pregunta[] = []

  ngOnInit() {
    this.idx = 0;
    this.cont = 0;
    this.show = 1;
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('act');
    this.codEvaluacion = +this._route.snapshot.paramMap.get('test');
    this._evaluacionServicio.getPregunta(this.codEvaluacion).subscribe(a => {
      this.preguntas = a
      this.cantidad = this.preguntas.length;
      if (this.preguntas[0].aleatorio == 'A') {
        var prueba = this.preguntas;
        prueba = prueba.sort(function () { return Math.random() - 0.5 })
        this.preguntas = prueba;
      }

    });


  }
  sum() {
    console.log("ARREGLO: " + this.preguntas.length)
    if (this.idx < this.preguntas.length - 1) {
      this.idx = this.idx + 1;
      this.show = this.show + 1
      console.log("cont: " + this.idx)
    } else {
      var puntaje: number = (this.cont / this.cantidad) * 100;
      this._actividadServicio.updateNota(this.codEvaluacion, this.codUsuario, puntaje)
        .subscribe((result) => {
        });;

      swal("Evaluacion finalizada", "Puntaje final: " + puntaje + "/100").then(() => {
        this._router.navigate(['login/estudiante/' + this.codUsuario + '/actividad/entrega/' + this.codCurso])
      });
    }
  }
  check(estado: string, res: string) {
    if (estado == res) {
      this.cont = this.cont + 1;
    }
  }

}
