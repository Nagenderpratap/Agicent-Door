import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngelInvestorRegistrationComponent } from './angel-investor-registration.component';

describe('AngelInvestorRegistrationComponent', () => {
  let component: AngelInvestorRegistrationComponent;
  let fixture: ComponentFixture<AngelInvestorRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngelInvestorRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngelInvestorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
