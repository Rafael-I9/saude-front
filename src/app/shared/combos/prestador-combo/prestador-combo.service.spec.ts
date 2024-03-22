import { TestBed } from '@angular/core/testing';

import { PrestadorComboService } from './prestador-combo.service';

describe('PrestadorComboService', () => {
  let service: PrestadorComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestadorComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
