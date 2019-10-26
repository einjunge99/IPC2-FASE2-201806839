import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modules/usuario-modulo';
import { Curso } from 'src/app/modules/curso-modulo';
import { Curso_asignacion } from 'src/app/modules/curso_asignacion-modelo';
import { cursoServicio } from 'src/app/services/curso-servicio';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

import swal from 'sweetalert';
import { estudianteServicio } from 'src/app/services/estudiante-servicio';

@Component({
  selector: 'app-asignar-curso',
  templateUrl: './asignar-curso.component.html',
  styleUrls: ['./asignar-curso.component.css']
})
export class Asignar2CursoComponent implements OnInit {

  constructor(private _cursoServicio: cursoServicio, private _estudianteServicio: estudianteServicio, private _router: Router, private _route: ActivatedRoute) { }

  resultado: Usuario[] = [];

  registroCurso: Curso[] = [];
  registroSeccion: Curso_asignacion[] = [];
  registroHorario: Curso_asignacion[] = [];

  registroAsignados: Curso[] = [];
  registroFecha: Curso[] = [];

 cursoSelect: string;
 horarioSelect: string;
seccionSelect: string;
codUsuario: number;
  completo: string;

 activar: boolean = false;

  ngOnInit() {
    let current_datetime = new Date()
    this.completo = current_datetime.getFullYear() + "/" + this.appendLeadingZeroes(current_datetime.getMonth() + 1) + "/" + this.appendLeadingZeroes(current_datetime.getDate());

    this._cursoServicio.getFechaLimite().subscribe(d => {
      this.registroFecha = d;
      var estado = this.registroFecha[0].fechaLimite;
      if (estado < this.completo) {
        this.activar = true;
      }




    });


    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');

    this._cursoServicio.getCurso3(this.codUsuario).subscribe(a => {
      this.registroCurso = a
      if (this.registroCurso.length != 0) {
        this.horarioUnico(this.registroCurso[0].nombre, this.codUsuario)
      }

    });

    this._cursoServicio.getCursoUsuario(this.codUsuario).subscribe(a => {
      this.registroAsignados = a
    });

    this._estudianteServicio.getBusqueda(this.codUsuario).subscribe(a => {
      this.resultado = a

    });
  }


  desasignar(codigo: number, inicio: string, fin: string, seccion: string) {
    if (this.activar) {
      // @ts-ignore
      swal({
        title: "Adviertencia",
        text: "El periodo para desasignar ha caducado",
        icon: "warning",
      })

    }
    else {


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

            swal("La desasignación fue exitosa!", {
              icon: "success",
            });
            this._estudianteServicio.eliminar(this.codUsuario, codigo, inicio, fin, seccion)
              .subscribe((result) => {
                console.log(result);
              });
            setTimeout(location.reload.bind(location), 1000);

          }
        });
    }
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
    this._estudianteServicio.addAsignacion(tercero, primero, segundo, p3, this.codUsuario)
      .subscribe((result) => {
        console.log(result);
      });

    swal("Enhorabuena!", "Asignación exitosa", "success");
    setTimeout(location.reload.bind(location), 1000);
  }

  //-------------METODOS PARA DESPLEGAR DATOS DE CURSOS-----------------//

  horarioUnico(cod: string, id: number) {
    this._estudianteServicio.getHorario(cod, id).subscribe(a => {
      this.registroHorario = a
      this.seccionUnico(cod, this.registroHorario[0].inicio, this.registroHorario[0].fin, id)

    });
  }

  seccionUnico(codigo: string, inicio: string, fin: string, id: number) {
    this._estudianteServicio.getSeccion(codigo, inicio, fin, id).subscribe(a => {
      this.registroSeccion = a

    });
  }

  horario() {
    let x = this.cursoSelect.split("-");
    var codigo = x[0];
    this._estudianteServicio.getHorario(codigo, this.codUsuario).subscribe(a => {
      this.registroHorario = a
      this.seccionUnico(codigo, this.registroHorario[0].inicio, this.registroHorario[0].fin, this.codUsuario)
    });

  }

  seccion() {
    let x = this.cursoSelect.split("-");
    let y = this.horarioSelect.split("-");
    var codigo = x[0];
    var horarioInicio = y[0];
    var horarioFin = y[1];
    this._estudianteServicio.getSeccion(codigo, horarioInicio, horarioFin, this.codUsuario).subscribe(a => {
      this.registroSeccion = a
    });
  }


  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }
}
