import { Component, OnInit } from '@angular/core';


import { Router } from "@angular/router";
import { Curso } from '../../../modules/curso-modulo';
import { cursoServicio } from '../../../services/curso-servicio';
import { Alert } from 'selenium-webdriver';



import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Curso_asignacion } from 'src/app/modules/curso_asignacion-modelo';

import swal from 'sweetalert';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _cursoServicio: cursoServicio, private _router: Router) { }

  primerForm: FormGroup;
  segundoForm: FormGroup;
  tercerForm: FormGroup;
  submitted = false;
  submitted2 = false;

  registroNombre: Curso[] = [];
  registroCurso: Curso[] = [];
  registroAsignacion: Curso_asignacion[] = [];
  registroAnios: Curso_asignacion[] = [];
  registroFecha: Curso[] = [];

  comprobar: Curso_asignacion[] = [];
  comprobarEliminar: Curso_asignacion[] = [];
  comprobarNombre: Curso[] = [];


  ngOnInit() {
    this._cursoServicio.getCurso2().subscribe(a => this.registroCurso = a);
    this._cursoServicio.getTodos().subscribe(b => this.registroAsignacion = b);
    this._cursoServicio.getAnios().subscribe(c => this.registroAnios = c);
    this._cursoServicio.getFechaLimite().subscribe(d => this.registroFecha = d);

    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required]]
    });

    this.segundoForm = this.formBuilder.group({
      cod: ['', Validators.required],
      seccion: ['', [Validators.required]],
      semestre: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: ['', [Validators.required]]
    });
    this.tercerForm = this.formBuilder.group({
      limite: ['', Validators.required],

    });
  }

  get f() { return this.primerForm.controls; }
  get ff() { return this.segundoForm.controls; }


  updateLimite() {
    var fecha = this.tercerForm.value.limite;
    this._cursoServicio.updateLimite(fecha)
      .subscribe((result) => {
        this.registroFecha = null;
        this._cursoServicio.getFechaLimite().subscribe(d => this.registroFecha = d);

      });

  }

  eliminar(cod: string) {
    this._cursoServicio.getComprobarAlumnos(cod).subscribe(a => {
      this.comprobarEliminar = a
      if (this.comprobarEliminar.length == 0) {
        // @ts-ignore
        swal({
          title: "Estas seguro?",
          text: "esta acción no se puede revocar",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              this._cursoServicio.eliminarCurso(cod)
                .subscribe((result) => {
                  this.registroAsignacion = null;
                  this.registroCurso = null;
                  this._cursoServicio.getCurso2().subscribe(a => this.registroCurso = a);
                  this._cursoServicio.getTodos().subscribe(b => this.registroAsignacion = b);
                });

              swal("El curso se eliminó con éxito", {
                icon: "success",
              });
            }
          });
        this.comprobarEliminar = null;
      }
      else {
        swal("Error", "Hay usuarios registrados a este curso", "warning");
      }
    });

  }

  agregarCurso(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      var nombre = this.primerForm.value.nombre;
      this._cursoServicio.getComprobarCodigo(nombre).subscribe(b => {
        this.comprobarNombre = b
        if (this.comprobarNombre.length == 0) {
          this._cursoServicio.addCurso(nombre, this.primerForm.value.descripcion)
            .subscribe((result) => {
              this.registroCurso = null;
              this._cursoServicio.getCurso2().subscribe(a => { this.registroCurso = a });
            });
          this.submitted = false;
          this.primerForm.reset();
        }
        else {
          swal("Error", "Código existente", "warning");
          this.submitted2 = false;
        }
      })


    }
  }


  agregarCursoDetalle(): void {
    this.submitted2 = true;
    if (this.segundoForm.invalid) {
      return;
    }
    else {
      var dato = this.segundoForm.value.cod;
      let x = dato.split("-");
      var codigo = x[0];
      this._cursoServicio.getComprobar(this.segundoForm.value.semestre, this.segundoForm.value.seccion, this.segundoForm.value.anio, codigo).subscribe(b => {
        this.comprobar = b
        if (this.comprobar.length == 0) {

          this._cursoServicio.addCursoDetalle(this.segundoForm.value.semestre, this.segundoForm.value.seccion, this.segundoForm.value.inicio, this.segundoForm.value.fin, this.segundoForm.value.anio, codigo)
            .subscribe((result) => {
              console.log(result);
              this.registroAsignacion = null;
              this._cursoServicio.getTodos().subscribe(b => { this.registroAsignacion = b });
            });
          this.submitted2 = false;
          this.segundoForm.reset();
          x = null;
          this.comprobar = null;
        } else {
          swal("Error", "Asignacion existente", "warning");
          this.submitted2 = false;
          x = null;
        }
      });



    }
  }
}





