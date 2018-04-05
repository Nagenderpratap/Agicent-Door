import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAngelComponent } from './edit-angel.component';

describe('EditAngelComponent', () => {
  let component: EditAngelComponent;
  let fixture: ComponentFixture<EditAngelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAngelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAngelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
