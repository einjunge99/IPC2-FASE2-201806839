import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//-------------------------------------MIS IMPORTS----------------------------------------------//

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './componentes/login/login.component';
import { IndexComponent } from './componentes/administrador/index/index.component';

import { CursosComponent } from './componentes/administrador/cursos/cursos.component';

import { cursoServicio } from './services/curso-servicio';
import { registroServicio } from './services/registro-servicio';
import { auxServicio } from './services/aux-servicio';
import { loginServicio } from './services/login-servicio';
import { estudianteServicio } from './services/estudiante-servicio';
import { actividadServicio } from './services/actividad-servicio';
import { ticketServicio } from './services/ticket-servicio';
import { foroServicio } from './services/foro-servicio';
import { asistenciaServicio } from './services/asistencia-servicio';



import { RegistroComponent } from './componentes/usuario/registro/registro.component';
import { RegistroAdminComponent } from './componentes/administrador/registro-admin/registro-admin.component';
import { AsignarComponent } from './componentes/administrador/asignar/asignar.component';
import { FilterPipe } from './filter.pipe';
import { AsignarCursoComponent } from './componentes/administrador/asignar-curso/asignar-curso.component';

import { Index2Component } from './componentes/estudiante/index/index.component';
import { Asignar2CursoComponent } from './componentes/estudiante/asignar-curso/asignar-curso.component';

import { Index3Component } from './componentes/auxiliar/index/index.component';
import { ActividadComponent } from './componentes/auxiliar/actividad/actividad.component';
import { CrearActividadComponent } from './componentes/auxiliar/crear-actividad/crear-actividad.component';
import { NotaActividadComponent } from './componentes/auxiliar/nota-actividad/nota-actividad.component';
import { CursoComponent } from './componentes/estudiante/curso/curso.component';
import { Actividad2Component } from './componentes/estudiante/actividad/actividad.component';
import { TicketComponent } from './componentes/estudiante/ticket/ticket.component';
import { TicketAdminComponent } from './component/administrador/ticket-admin/ticket-admin.component';
import { AdminTicketComponent } from './componentes/administrador/admin-ticket/admin-ticket.component';
import { TicketAuxComponent } from './componentes/auxiliar/ticket-aux/ticket-aux.component';
import { ForoAuxComponent } from './componentes/auxiliar/foro-aux/foro-aux.component';
import { ForoCrearComponent } from './componentes/auxiliar/foro-crear/foro-crear.component';
import { ForoComponent } from './componentes/estudiante/foro/foro.component';
import { ForoEstudianteComponent } from './componentes/estudiante/foro-estudiante/foro-estudiante.component';
import { MensajesComponent } from './componentes/auxiliar/mensajes/mensajes.component';
import { MensajesEstudiantesComponent } from './componentes/estudiante/mensajes-estudiantes/mensajes-estudiantes.component';
import { AsistenciaComponent } from './componentes/auxiliar/asistencia/asistencia.component';
import { CrearTestComponent } from './componentes/auxiliar/crear-test/crear-test.component';
import { PreguntasComponent } from './componentes/auxiliar/preguntas/preguntas.component';
import { evaluacionServicio } from './services/evaluacion-servicio';
import { TestComponent } from './componentes/estudiante/test/test.component';


const Rutas: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/registro', component: RegistroComponent
  },
  {
    path: 'login/admin', component: IndexComponent, children: [
      {
        path: 'cursos', component: CursosComponent
      },
      {
        path: 'registro', component: RegistroAdminComponent
      },
      {
        path: 'asignar', component: AsignarComponent
      },
      {
        path: 'tickets', component: AdminTicketComponent
      }
      ,
      {
        path: 'asignar/curso/:id', component: AsignarCursoComponent
      }
    ]
  },

  {
    path: 'login/estudiante/:id', component: Index2Component, children: [
      {
        path: 'cursos', component: Asignar2CursoComponent
      },
      {
        path: 'mensajes', component: MensajesEstudiantesComponent
      },
      {
        path: 'actividad', component: Actividad2Component
      },
      {
        path: 'actividad/entrega/:act', component: CursoComponent
      },
      {
        path: 'actividad/entrega/:act/inicio/:test', component: TestComponent
      },
      {
        path: 'actividad/ticket/:act', component: TicketComponent
      },
      {
        path: 'actividad/foro/:act', component: ForoComponent
      },
      {
        path: 'actividad/foro/:act/mensajes/:cod', component: ForoEstudianteComponent
      }


    ]
  },


  {
    path: 'login/auxiliar/:id', component: Index3Component, children: [
      {
        path: 'actividades', component: ActividadComponent,
      },
      {
        path: 'mensajes', component: MensajesComponent,
      },
      {
        path: 'actividades/ticket/:asignacion', component: TicketAuxComponent,
      },
      {
        path: 'actividades/test/:asignacion', component: CrearTestComponent,
      },
      {
        path: 'actividades/test/:asignacion/pregunta/:cod', component: PreguntasComponent,
      },
      {
        path: 'actividades/asistencia/:asignacion', component: AsistenciaComponent,
      },
      {
        path: 'actividades/crear/:asignacion', component: CrearActividadComponent,
      },
      {
        path: 'actividades/foro/:asignacion', component: ForoCrearComponent,
      },
      {
        path: 'actividades/foro/:asignacion/mensajes/:cod', component: ForoAuxComponent,
      },
      {
        path: 'actividades/crear/:asignacion/nota/:act', component: NotaActividadComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    CursosComponent,
    RegistroComponent,
    RegistroAdminComponent,
    AsignarComponent,
    FilterPipe,
    AsignarCursoComponent,


    //------------IMPORTS DEL ESTUDIANTE----------//

    Asignar2CursoComponent,
    Index2Component,
    ActividadComponent,
    Index3Component,
    CrearActividadComponent,
    NotaActividadComponent,
    CursoComponent,
    Actividad2Component,
    TicketComponent,
    TicketAdminComponent,
    AdminTicketComponent,
    TicketAuxComponent,
    ForoAuxComponent,
    ForoCrearComponent,
    ForoComponent,
    ForoEstudianteComponent,
    MensajesComponent,
    MensajesEstudiantesComponent,
    AsistenciaComponent,
    CrearTestComponent,
    PreguntasComponent,
    TestComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Rutas),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule, cursoServicio, registroServicio, auxServicio, loginServicio, estudianteServicio, actividadServicio, ticketServicio, foroServicio, asistenciaServicio,evaluacionServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
