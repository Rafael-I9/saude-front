import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadorGrupoComboComponent } from './prestador-grupo-combo.component';

describe('PrestadorGrupoComboComponent', () => {
  let component: PrestadorGrupoComboComponent;
  let fixture: ComponentFixture<PrestadorGrupoComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestadorGrupoComboComponent]
    });
    fixture = TestBed.createComponent(PrestadorGrupoComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
