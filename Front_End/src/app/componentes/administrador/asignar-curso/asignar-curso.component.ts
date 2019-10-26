import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/modules/usuario-modulo';
import { Router, ActivatedRoute } from '@angular/router';
import { auxServicio } from 'src/app/services/aux-servicio';
import { cursoServicio } from 'src/app/services/curso-servicio';
import { Curso } from 'src/app/modules/curso-modulo';
import { Curso_asignacion } from 'src/app/modules/curso_asignacion-modelo';


import swal from 'sweetalert';

@Component({
  selector: 'app-asignar-curso',
  templateUrl: './asignar-curso.component.html',
  styleUrls: ['./asignar-curso.component.css']
})
export class AsignarCursoComponent implements OnInit {

  constructor(private _cursoServicio: cursoServicio, private _auxServicio: auxServicio, private _router: Router, private _route: ActivatedRoute) { }

  resultado: Usuario[] = [];
  registroCurso: Curso[] = [];
  registroSeccion: Curso_asignacion[] = [];
  registroHorario: Curso_asignacion[] = [];
  registroAsignados: Curso[] = [];

 cursoSelect: string;
 horarioSelect: string;
seccionSelect: string;
codUsuario: number;

  ngOnInit() {
    this._cursoServicio.getCurso().subscribe(a => {
      this.registroCurso = a
      this.horarioUnico(this.registroCurso[0].nombre)
    });

    this.codUsuario = +this._route.snapshot.paramMap.get('id');

    this._cursoServicio.getCursoUsuario(this.codUsuario).subscribe(a => {
      this.registroAsignados = a
    });

    this._auxServicio.getBusqueda(this.codUsuario).subscribe(a => {
      this.resultado = a

    });
  }

  desasignar(codigo: number) {
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
             // @ts-ignore
          swal("Especifique el motivo:", {
            content: "input",
          })
            .then(() => {
              swal("La desasignación fue exitosa!", {
                icon: "success",
              });
              this._auxServicio.eliminar(this.codUsuario,codigo)
                .subscribe((result) => {
                  console.log(result);
                });
                setTimeout(location.reload.bind(location), 1000);
            });
        }
      });
  }

  asignar() {
    
    var select = document.getElementById("select");
       // @ts-ignore
    var p1 = select.options[select.selectedIndex].text;
    var inicio = document.getElementById("inicio");
       // @ts-ignore
    var p2 = inicio.options[inicio.selectedIndex].text;

    let x = p2.split("-");
    var primero = x[0];
    var segundo = x[1];

    let y = p1.split("-");
    var tercero = y[0];

    var seccion = document.getElementById("seccion");
       // @ts-ignore
    var p3 = seccion.options[seccion.selectedIndex].text;
    this._auxServicio.addAsignacion(tercero, primero, segundo, p3, this.codUsuario)
      .subscribe((result) => {
        console.log(result);
      });

    swal("Enhorabuena!", "Asignación exitosa", "success");
    setTimeout(location.reload.bind(location), 1000);
  }

  //-------------METODOS PARA DESPLEGAR DATOS DE CURSOS-----------------//

  horarioUnico(codigo: string) {
    var cod = codigo.toString()
    this._auxServicio.getHorario(cod).subscribe(a => {
      this.registroHorario = a
      this.seccionUnico(cod, this.registroHorario[0].inicio, this.registroHorario[0].fin)

    });
  }

  seccionUnico(codigo: string, inicio: string, fin: string) {
    this._auxServicio.getSeccion(codigo, inicio, fin).subscribe(a => {
      this.registroSeccion = a

    });
  }

  horario() {
    let x = this.cursoSelect.split("-");
    var codigo = x[0];
    this._auxServicio.getHorario(codigo).subscribe(a => {
      this.registroHorario = a
      this.seccionUnico(codigo, this.registroHorario[0].inicio, this.registroHorario[0].fin)
    });

  }

  seccion() {
 
    let x = this.cursoSelect.split("-");
    let y = this.horarioSelect.split("-");
    var codigo = x[0];
    var horarioInicio = y[0];
    var horarioFin = y[1];
    this._auxServicio.getSeccion(codigo, horarioInicio, horarioFin).subscribe(a => {
      this.registroSeccion = a
    });
  }

  

}

