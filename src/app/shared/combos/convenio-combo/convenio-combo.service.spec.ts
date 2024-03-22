import { TestBed } from '@angular/core/testing';
import { ConvenioComboService } from './convenio-combo.service';

describe('ConvenioComboService', () => {
  let service: ConvenioComboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvenioComboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
