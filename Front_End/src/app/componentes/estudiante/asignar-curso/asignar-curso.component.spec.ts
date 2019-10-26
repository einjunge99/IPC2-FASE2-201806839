import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asignar2CursoComponent } from './asignar-curso.component';

describe('AsignarCursoComponent', () => {
  let component: Asignar2CursoComponent;
  let fixture: ComponentFixture<Asignar2CursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asignar2CursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asignar2CursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
