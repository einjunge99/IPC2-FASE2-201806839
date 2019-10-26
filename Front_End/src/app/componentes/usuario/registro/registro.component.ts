import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { Curso } from '../../../modules/curso-modulo';
import { Alert } from 'selenium-webdriver';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {registroServicio} from '../../../services/registro-servicio'

import swal from 'sweetalert';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private _registroServicio:registroServicio, private formBuilder: FormBuilder,private _router: Router) {}

  primerForm: FormGroup;
  submitted = false;


  ngOnInit() {
    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      carne: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contra: ['', [Validators.required]]
  },);
  }

  get f() { return this.primerForm.controls; }

  
  agregarUsuario():void {
    this.submitted = true;
    if (this.primerForm.invalid) {
        return;
    }
    else{
      this._registroServicio.addUsuario(this.primerForm.value.nombre,this.primerForm.value.carne,this.primerForm.value.contra,this.primerForm.value.correo,2)
      .subscribe((result) =>{
        console.log(result);
      });
      swal("El registro fue exitoso", {
        icon: "success",
      });
      this.inicio()
    }
  }

  inicio(){
    setTimeout(() => {
      this._router.navigate([''])
      }
      , 2000);
}


}
