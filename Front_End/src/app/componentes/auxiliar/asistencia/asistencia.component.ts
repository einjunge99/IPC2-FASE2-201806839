import { Component, OnInit } from '@angular/core';
import { cursoServicio } from 'src/app/services/curso-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modules/usuario-modulo';
import { asistenciaServicio } from 'src/app/services/asistencia-servicio';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private _asistenciaServicio: asistenciaServicio, private _router: Router, private _route: ActivatedRoute) { }


  estudiantes: Usuario[] = [];
  registrados: Usuario[] = [];
   codCurso: number;
   completo: string;

  primerForm: FormGroup;
  submitted = false;



  ngOnInit() {
    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');
    this.primerForm = this.formBuilder.group({
      fecha: ['', [Validators.required]],
    });
    let current_datetime = new Date()
    this.completo = current_datetime.getFullYear() + "-" + this.appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + this.appendLeadingZeroes(current_datetime.getDate());

    this._asistenciaServicio.getEstudiantesCurso(this.codCurso, this.completo).subscribe(a => {
      this.estudiantes = a
    });
    this._asistenciaServicio.getAsistencias(this.codCurso, this.completo).subscribe(a => {
      this.registrados = a
    });
  }
  get ff() { return this.primerForm.controls; }

  agregar(usuario: number) {
    this._asistenciaServicio.addAsistencia(this.completo, usuario, this.codCurso)
      .subscribe((result) => {
        console.log(result);
        this.estudiantes = null;
        this.registrados = null;
        this._asistenciaServicio.getAsistencias(this.codCurso, this.completo).subscribe(a => {
          this.registrados = a
        });
        this._asistenciaServicio.getEstudiantesCurso(this.codCurso, this.completo).subscribe(a => {
          this.estudiantes = a
        });
      });
  }

  update(cod: number, estado: string) {
    var nuevoEstado: string;
    if (estado == 'T') {
      nuevoEstado = 'F';
    }
    else {
      nuevoEstado = 'T'
    }
    this._asistenciaServicio.updateAsistencia(cod, nuevoEstado)
      .subscribe((result) => {
        this.registrados = null;
        this._asistenciaServicio.getAsistencias(this.codCurso, this.completo).subscribe(a => {
          this.registrados = a
        });
      });
  }

  buscar() {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      this.completo = this.primerForm.value.fecha;
      this.estudiantes = null;
      this.registrados = null;
      this._asistenciaServicio.getAsistencias(this.codCurso, this.completo).subscribe(a => {
        this.registrados = a
      });
      this._asistenciaServicio.getEstudiantesCurso(this.codCurso, this.completo).subscribe(a => {
        this.estudiantes = a
      });
    }
  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }

}
