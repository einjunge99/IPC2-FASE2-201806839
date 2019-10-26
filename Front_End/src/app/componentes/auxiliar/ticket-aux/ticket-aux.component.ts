import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/ticket-modulo';
import { ticketServicio } from 'src/app/services/ticket-servicio';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-aux',
  templateUrl: './ticket-aux.component.html',
  styleUrls: ['./ticket-aux.component.css']
})
export class TicketAuxComponent implements OnInit {

  constructor(private _ticketServicio: ticketServicio, private _router: Router, private _route: ActivatedRoute) { }
  ticket: Ticket[]=[];
 codCurso: number;
codUsuario:number;

  ngOnInit() {
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('asignacion');

    this._ticketServicio.getTicketAux(this.codCurso,this.codUsuario).subscribe(a => {
      this.ticket = a
    });
 
  }

}
