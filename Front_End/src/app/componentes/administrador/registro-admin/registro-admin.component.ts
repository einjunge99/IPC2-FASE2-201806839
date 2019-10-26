import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { registroServicio } from '../../../services/registro-servicio'
import swal from 'sweetalert';


import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Usuario } from 'src/app/modules/usuario-modulo';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _registroServicio: registroServicio, private _router: Router) { }

  primerForm: FormGroup;
  submitted = false;

  usuarios: Usuario[] = [];

  ngOnInit() {
    this._registroServicio.getUsuarios().subscribe(a => {
      this.usuarios = a

    }
    );

    this.primerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      carne: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contra: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  get f() { return this.primerForm.controls; }

  agregarUsuario(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      var rol: number;
      if (this.primerForm.value.tipo == "estudiante") {
        rol = 2;
      }
      else {
        rol = 3;
      }

      this._registroServicio.addUsuario(this.primerForm.value.nombre, this.primerForm.value.carne, this.primerForm.value.contra, this.primerForm.value.correo, rol)
        .subscribe((result) => {
          this.usuarios=null;
          this._registroServicio.getUsuarios().subscribe(a => {
            this.usuarios = a
          });
        });
      swal("Enhorabuena!", "Registro exitoso", "success");
      this.primerForm.reset();
      this.submitted=false;
    }
  }

}
