import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesEstudiantesComponent } from './mensajes-estudiantes.component';

describe('MensajesEstudiantesComponent', () => {
  let component: MensajesEstudiantesComponent;
  let fixture: ComponentFixture<MensajesEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
