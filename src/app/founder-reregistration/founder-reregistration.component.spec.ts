import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderReregistrationComponent } from './founder-reregistration.component';

describe('FounderReregistrationComponent', () => {
  let component: FounderReregistrationComponent;
  let fixture: ComponentFixture<FounderReregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FounderReregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderReregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
