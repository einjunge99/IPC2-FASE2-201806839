import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ticketServicio } from 'src/app/services/ticket-servicio';

import swal from 'sweetalert';
import { Ticket } from 'src/app/modules/ticket-modulo';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _ticketServicio: ticketServicio, private _router: Router, private _route: ActivatedRoute) { }

  primerForm: FormGroup;
  submitted = false;
  ticket: Ticket[] = [];

   codCurso: number;
   codUsuario: number;

  ngOnInit() {
    this.primerForm = this.formBuilder.group({
      asunto: ['', Validators.required],
      contenido: ['', [Validators.required]],
    });
    this.codUsuario = +this._route.parent.snapshot.paramMap.get('id');
    this.codCurso = +this._route.snapshot.paramMap.get('act');
    this._ticketServicio.getTicket(this.codCurso, this.codUsuario).subscribe(a => {
      this.ticket = a
    });
  }
  get ff() { return this.primerForm.controls; }

  agregarTicket(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      swal("Ticket registrado!", {
        icon: "success",
      });
      this._ticketServicio.addTicket(this.primerForm.value.asunto, this.primerForm.value.contenido, this.codUsuario, this.codCurso)
        .subscribe((result) => {
          this.ticket=null;
          this._ticketServicio.getTicket(this.codCurso, this.codUsuario).subscribe(a => {
            this.ticket = a
          });
        });;
   this.submitted=false;
   this.primerForm.reset();
    }
  }

}
