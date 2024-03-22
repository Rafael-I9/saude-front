import { TestBed } from '@angular/core/testing';

import { UnidadeFaturamentoComboService } from './unidade-faturamento-combo.service';

describe('UnidadeFaturamentoComboService', () => {
  let service: UnidadeFaturamentoComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadeFaturamentoComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
