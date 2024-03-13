import { TestBed } from '@angular/core/testing';

import { ExportCihaService } from './export-ciha.service';

describe('ExportCihaService', () => {
  let service: ExportCihaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportCihaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
