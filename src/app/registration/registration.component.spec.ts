import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTrialComponent } from './signup-trial.component';

describe('SignupTrialComponent', () => {
  let component: SignupTrialComponent;
  let fixture: ComponentFixture<SignupTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
