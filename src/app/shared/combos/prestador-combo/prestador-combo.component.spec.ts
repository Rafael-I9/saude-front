import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadorComboComponent } from './prestador-combo.component';

describe('PrestadorComboComponent', () => {
  let component: PrestadorComboComponent;
  let fixture: ComponentFixture<PrestadorComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestadorComboComponent]
    });
    fixture = TestBed.createComponent(PrestadorComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
