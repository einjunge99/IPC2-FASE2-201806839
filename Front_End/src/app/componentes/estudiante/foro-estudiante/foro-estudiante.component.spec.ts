import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoEstudianteComponent } from './foro-estudiante.component';

describe('ForoEstudianteComponent', () => {
  let component: ForoEstudianteComponent;
  let fixture: ComponentFixture<ForoEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
