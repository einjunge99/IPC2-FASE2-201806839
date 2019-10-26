import { Component, OnInit } from '@angular/core';
import { foroServicio } from 'src/app/services/foro-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { Foro } from 'src/app/modules/foro-modelo';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  constructor(private _foroServicio: foroServicio, private _router: Router, private _route: ActivatedRoute) { }
 
  foros:Foro[]=[]
 codCurso: number;
 codUsuario: number;
 
  ngOnInit() {
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('act');
    this._foroServicio.getForo(this.codCurso).subscribe(a => {
      this.foros = a
    });
    
  }

  mensajes(asignacion:string){
    this._router.navigate(['login/estudiante/'+this.codUsuario+'/actividad/foro/'+this.codCurso+'/mensajes',asignacion])
  }

}
