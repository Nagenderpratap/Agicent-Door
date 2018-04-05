import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupProfileComponent } from './startup-profile.component';

describe('StartupProfileComponent', () => {
  let component: StartupProfileComponent;
  let fixture: ComponentFixture<StartupProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
