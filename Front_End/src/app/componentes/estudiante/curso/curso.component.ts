import { Component, OnInit } from '@angular/core';
import { actividadServicio } from 'src/app/services/actividad-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actividad } from 'src/app/modules/actividad-modulo';
import { Alert } from 'selenium-webdriver';

import swal from 'sweetalert';
import { Evaluacion } from 'src/app/modules/evaluaciones-modulo';
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private _actividadServicio: actividadServicio, private _router: Router, private _route: ActivatedRoute) { }

  primerForm: FormGroup;
  submitted = false;
  actividades: Actividad[] = []
  evaluaciones: Evaluacion[] = []
  evaluacionesEntregadas: Evaluacion[] = []
  actividadesEntregadas: Actividad[] = []

   cod_ASIGNACION: number;
   codUsuario: number;

completo: string;



  ngOnInit() {
    this.primerForm = this.formBuilder.group({
      contenido: [''],
    });
    let current_datetime = new Date()
    this.completo = current_datetime.getFullYear() + "/" + this.appendLeadingZeroes(current_datetime.getMonth() + 1) + "/" + this.appendLeadingZeroes(current_datetime.getDate()) + " " + this.appendLeadingZeroes(current_datetime.getHours()) + ":" + this.appendLeadingZeroes(current_datetime.getMinutes())
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.cod_ASIGNACION = +this._route.snapshot.paramMap.get('act');
    this._actividadServicio.getActividades(this.cod_ASIGNACION, this.codUsuario).subscribe(a => {
      this.actividades = a
    });
    this._actividadServicio.getActividadNota(this.cod_ASIGNACION, this.codUsuario).subscribe(b => {
      this.actividadesEntregadas = b
    });
    this._actividadServicio.getEvaluacion(this.cod_ASIGNACION, this.codUsuario).subscribe(c => {
      this.evaluaciones = c
    });
    this._actividadServicio.getNotaEvaluacion(this.cod_ASIGNACION, this.codUsuario).subscribe(d => {
      this.evaluacionesEntregadas = d
    });

  }
  get ff() { return this.primerForm.controls; }

  inicio(test: number) {
    // @ts-ignore
    swal({
      title: "Advertencia!",
      text: "tienes un único intento, continuar?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this._actividadServicio.addUsuario(test, this.codUsuario)
            .subscribe((result) => {
              console.log(result);
            });
          this._router.navigate(['login/estudiante/' + this.codUsuario + '/actividad/entrega/' + this.cod_ASIGNACION + '/inicio', test])
        }
      });


  }

  agregarNota(actividad: number) {

    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      if (this.primerForm.value.contenido == "") {
        // @ts-ignore
        swal({
          title: "El campo está en blanco!",
          text: "no podrás hacer cambios, continuar?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              // @ts-ignore
              swal("Actividad entregada", {
                icon: "success",
              });
              var usuario = this.codUsuario.toString();
              this._actividadServicio.addEntregaUsuario(actividad, '0', this.codUsuario, this.primerForm.value.contenido)
                .subscribe((result) => {
                  this.actividades=null;
                  this._actividadServicio.getActividades(this.cod_ASIGNACION, this.codUsuario).subscribe(a => {
                    this.actividades = a
                  });
                  this.actividadesEntregadas=null;
                  this._actividadServicio.getActividadNota(this.cod_ASIGNACION, this.codUsuario).subscribe(b => {
                    this.actividadesEntregadas = b
                  });
                });
         

            }
          });
      }
      else {
        swal("Actividad entregada", {
          icon: "success",
        });
        this._actividadServicio.addEntregaUsuario(actividad, '0', this.codUsuario, this.primerForm.value.contenido)
          .subscribe((result) => {
            this.actividades=null;
            this._actividadServicio.getActividades(this.cod_ASIGNACION, this.codUsuario).subscribe(a => {
              this.actividades = a
            });
            this.actividadesEntregadas=null;
            this._actividadServicio.getActividadNota(this.cod_ASIGNACION, this.codUsuario).subscribe(b => {
              this.actividadesEntregadas = b
            });
          });

      }

    }


  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }

}
