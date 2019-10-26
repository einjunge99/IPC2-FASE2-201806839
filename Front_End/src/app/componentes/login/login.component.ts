
import { Component, OnInit } from '@angular/core';

import { loginServicio } from '../../services/login-servicio';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';


import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Usuario } from 'src/app/modules/usuario-modulo';

import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private servicioLogin: loginServicio, private _router: Router) { }

  ngOnInit() {

    this.primerForm = this.formBuilder.group({
      carne: ['', [Validators.required]],
      contra: ['', [Validators.required]]
    });
  }

  primerForm: FormGroup;
  submitted = false;

  resultado: Usuario[] = [];



    
  get f() { return this.primerForm.controls; }

  inicio(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      var carne: string = this.primerForm.value.carne;
      var contra: string = this.primerForm.value.contra;
      this.servicioLogin.login(carne, contra).subscribe(a => {
        this.resultado = a

        if (this.resultado[0] != undefined) {
          if (this.resultado[0].fk_cod_ROL == 1) {

            this.admin(this.resultado[0].nombre);
          }
          else if (this.resultado[0].fk_cod_ROL == 2) {

            this.estudiante(this.resultado[0].cod_USUARIO);
          }
          else {
            this.aux(this.resultado[0].cod_USUARIO)
          }
        }
        else {
          swal("Error", "Usuario y/o contraseña incorrecta", "error");
        }

      })

    }


  }

  admin(nombre:string) {
    swal("Bienvenido al sistema!");
    setTimeout(() => {
      this._router.navigate(['login/admin/cursos'])
    }
      , 1000);
  }
  estudiante(codigo:number) {
    swal("Bienvenido al sistema!");
    setTimeout(() => {
      
      this._router.navigate(['login/estudiante/'+codigo+'/cursos'])
    }
      , 1000);
  }
  aux(codigo:number) {
    swal("Bienvenido al sistema!");
    setTimeout(() => {
      
      this._router.navigate(['login/auxiliar/'+codigo+'/actividades'])
    }
      , 1000);
  }


}
