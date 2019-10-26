import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoCrearComponent } from './foro-crear.component';

describe('ForoCrearComponent', () => {
  let component: ForoCrearComponent;
  let fixture: ComponentFixture<ForoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
