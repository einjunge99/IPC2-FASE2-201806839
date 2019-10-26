import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTestComponent } from './crear-test.component';

describe('CrearTestComponent', () => {
  let component: CrearTestComponent;
  let fixture: ComponentFixture<CrearTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
