import { TestBed } from '@angular/core/testing';

import { FolhaProducaoPrestadoresService } from './folha-producao-prestadores.service';

describe('FolhaProducaoPrestadoresService', () => {
  let service: FolhaProducaoPrestadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolhaProducaoPrestadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
