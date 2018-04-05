import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngelInvestorProfileComponent } from './angel-investor-profile.component';

describe('AngelInvestorProfileComponent', () => {
  let component: AngelInvestorProfileComponent;
  let fixture: ComponentFixture<AngelInvestorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngelInvestorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngelInvestorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
