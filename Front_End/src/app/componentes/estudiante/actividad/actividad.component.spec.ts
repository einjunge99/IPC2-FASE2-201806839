import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Actividad2Component } from './actividad.component';

describe('Actividad2Component', () => {
  let component: Actividad2Component;
  let fixture: ComponentFixture<Actividad2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Actividad2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Actividad2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
