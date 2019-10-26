import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAuxComponent } from './ticket-aux.component';

describe('TicketAuxComponent', () => {
  let component: TicketAuxComponent;
  let fixture: ComponentFixture<TicketAuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
