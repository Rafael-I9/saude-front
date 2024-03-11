import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageModule } from '@po-ui/ng-components';

import { MaintenancePriceTableProcServComponent } from './maintenance-price-table-procserv.component';

describe('MaintenancePriceTableProcServComponent', () => {
  let component: MaintenancePriceTableProcServComponent;
  let fixture: ComponentFixture<MaintenancePriceTableProcServComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageModule
      ],
      declarations: [ MaintenancePriceTableProcServComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePriceTableProcServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
