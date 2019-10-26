import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoAuxComponent } from './foro-aux.component';

describe('ForoAuxComponent', () => {
  let component: ForoAuxComponent;
  let fixture: ComponentFixture<ForoAuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoAuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
