import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCihaFiltrosComponent } from './export-ciha-filtros.component';

describe('ExportCihaFiltrosComponent', () => {
  let component: ExportCihaFiltrosComponent;
  let fixture: ComponentFixture<ExportCihaFiltrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportCihaFiltrosComponent]
    });
    fixture = TestBed.createComponent(ExportCihaFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
