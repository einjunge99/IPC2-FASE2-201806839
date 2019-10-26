import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaActividadComponent } from './nota-actividad.component';

describe('NotaActividadComponent', () => {
  let component: NotaActividadComponent;
  let fixture: ComponentFixture<NotaActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
