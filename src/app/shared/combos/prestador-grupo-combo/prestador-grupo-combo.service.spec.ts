import { TestBed } from '@angular/core/testing';

import { PrestadorGrupoComboService } from './prestador-grupo-combo.service';

describe('PrestadorGrupoComboService', () => {
  let service: PrestadorGrupoComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestadorGrupoComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
