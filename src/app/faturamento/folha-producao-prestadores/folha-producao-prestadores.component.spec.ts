import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolhaProducaoPrestadoresComponent } from './folha-producao-prestadores.component';

describe('FolhaProducaoPrestadoresComponent', () => {
  let component: FolhaProducaoPrestadoresComponent;
  let fixture: ComponentFixture<FolhaProducaoPrestadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolhaProducaoPrestadoresComponent]
    });
    fixture = TestBed.createComponent(FolhaProducaoPrestadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
