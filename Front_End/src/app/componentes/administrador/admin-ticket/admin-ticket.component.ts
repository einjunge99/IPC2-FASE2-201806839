import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ticketServicio } from 'src/app/services/ticket-servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/modules/ticket-modulo';

import swal from 'sweetalert';
@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.css']
})
export class AdminTicketComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _ticketServicio: ticketServicio, private _router: Router, private _route: ActivatedRoute) { }


  primerForm: FormGroup;
  submitted = false;
  ticketPendiente: Ticket[] = [];
  ticketAtendido: Ticket[] = [];

 cod_ticket: string;


  ngOnInit() {
    this.primerForm = this.formBuilder.group({
      asunto: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
    });

    this._ticketServicio.getTicketAdmin().subscribe(a => {
      this.ticketPendiente = a
    });
    this._ticketServicio.getTicketAtendido().subscribe(a => {
      this.ticketAtendido = a
    });
  }
  get ff() { return this.primerForm.controls; }

  agregarRespuesta(): void {
    this.submitted = true;
    if (this.primerForm.invalid) {
      return;
    }
    else {
      swal("Ticket registrado!", {
        icon: "success",
      });

      this._ticketServicio.updateTicketAdmin(this.cod_ticket, this.primerForm.value.asunto)
        .subscribe((result) => {
          this.ticketAtendido = null;
          this._ticketServicio.getTicketAtendido().subscribe(a => {
            this.ticketAtendido = a
          });

        });;


    }
  }
  evento(asunto: string, ticket: string) {
    this.primerForm.controls['titulo'].setValue(asunto);
    this.cod_ticket = ticket;
  }

}
