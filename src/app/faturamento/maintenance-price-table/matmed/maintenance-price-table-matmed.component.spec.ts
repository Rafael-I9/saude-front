import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageModule } from '@po-ui/ng-components';

import { MaintenancePriceTableMatMedComponent } from './maintenance-price-table-matmed.component';

describe('MaintenancePriceTableMatMedComponent', () => {
  let component: MaintenancePriceTableMatMedComponent;
  let fixture: ComponentFixture<MaintenancePriceTableMatMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageModule
      ],
      declarations: [ MaintenancePriceTableMatMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePriceTableMatMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
