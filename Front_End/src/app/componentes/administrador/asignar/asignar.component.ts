import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/modules/usuario-modulo';
import { Router, ActivatedRoute } from '@angular/router';
import { auxServicio } from 'src/app/services/aux-servicio';

import swal from 'sweetalert';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms'
import { Curso_asignacion } from 'src/app/modules/curso_asignacion-modelo';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

  aux:Usuario[]=[];
  auxFiltrados:Usuario[]=[];
  cursosAsignados:Curso_asignacion[]=[];
 _searchTerm: string;
 _searchTerm2: string;
 _searchTerm3: string;
  
  constructor(private _auxServicio: auxServicio, private _router: Router,private _route: ActivatedRoute) { }

    ngOnInit() {
      
      this._auxServicio.getAux().subscribe(a =>{
        this.aux = a
        this.auxFiltrados = this.aux;
      });
      this._auxServicio.getCursosAsignados().subscribe(b=>{
        this.cursosAsignados=b;
      })

     
    }

asignar(codigo:number){
this._router.navigate(['login/admin/asignar/curso',codigo])
}

prueba(user:number,asignacion:number){
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
            this._auxServicio.eliminar(user,asignacion)
              .subscribe((result) => {
                this.cursosAsignados=null;
                this._auxServicio.getCursosAsignados().subscribe(b=>{
                  this.cursosAsignados=b;
                })
              });
        
      }
    });


}

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.auxFiltrados = this.filterEmployees(value);
  }

  filterEmployees(searchString: string) {
    return this.aux.filter(aux =>  
      aux.nombre.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }


  get searchTerm2(): string {
    return this._searchTerm2;
  }

  set searchTerm2(value: string) {
    this._searchTerm2 = value;
    this.auxFiltrados = this.filtro2(value);
  }

  filtro2(searchString: string) {
    return this.aux.filter(aux =>  
      aux.carne.toString().toLowerCase().indexOf(searchString) !== -1);
  }

  get searchTerm3(): string {
    return this._searchTerm3;
  }

  set searchTerm3(value: string) {
    this._searchTerm3 = value;
    this.auxFiltrados = this.filtro3(value);
  }

  filtro3(searchString: string) {
    return this.aux.filter(aux =>  
      aux.correo.toString().toLowerCase().indexOf(searchString) !== -1);
  }



}




