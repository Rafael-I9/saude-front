import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeFaturamentoComboComponent } from './unidade-faturamento-combo.component';

describe('UnidadeFaturamentoComboComponent', () => {
  let component: UnidadeFaturamentoComboComponent;
  let fixture: ComponentFixture<UnidadeFaturamentoComboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeFaturamentoComboComponent]
    });
    fixture = TestBed.createComponent(UnidadeFaturamentoComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
