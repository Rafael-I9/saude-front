import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { MaintenancePriceTableProcServComponent } from './maintenance-price-table-procserv.component';
import { MaintenancePriceTableProcServRoutingModule } from './maintenance-price-table-procserv-routing.module';
import { TCommonApiModule } from '@totvs/common-api';
import { RequestInterceptorHttp } from '../../../shared/interceptor/interceptor';

@NgModule({
  declarations: [
    MaintenancePriceTableProcServComponent
  ],
  imports: [
    CommonModule,
    SmartUIComponentsModule,
    PoModule,
    MaintenancePriceTableProcServRoutingModule,
    TCommonApiModule
  ],
  providers: [
    RequestInterceptorHttp
  ]
})
export class MaintenancePriceTableProcServModule { }
