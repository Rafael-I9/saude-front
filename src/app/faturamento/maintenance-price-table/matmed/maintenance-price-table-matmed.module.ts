import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { MaintenancePriceTableMatMedComponent } from './maintenance-price-table-matmed.component';
import { MaintenancePriceTableMatMedRoutingModule } from './maintenance-price-table-matmed-routing.module';
import { TCommonApiModule } from '@totvs/common-api';
import { RequestInterceptorHttp } from '../../../shared/interceptor/interceptor';

@NgModule({
  declarations: [
    MaintenancePriceTableMatMedComponent
  ],
  imports: [
    CommonModule,
    SmartUIComponentsModule,
    PoModule,
    MaintenancePriceTableMatMedRoutingModule,
    TCommonApiModule
  ],
  providers: [
    RequestInterceptorHttp
  ]
})
export class MaintenancePriceTableMatMedModule { }
