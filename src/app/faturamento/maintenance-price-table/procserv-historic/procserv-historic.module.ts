import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { ProcServHistoricComponent } from './procserv-historic.component';
import { ProcServHistoricRoutingModule } from './procserv-historic-routing.module';
import { TCommonApiModule } from '@totvs/common-api';
import { RequestInterceptorHttp } from '../../../core/interceptors/interceptor';
import { HistoryComponent } from '../../components/history/history.component';

@NgModule({
  declarations: [
    ProcServHistoricComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SmartUIComponentsModule,
    PoModule,
    ProcServHistoricRoutingModule,
    TCommonApiModule
  ],
  providers: [
    RequestInterceptorHttp
  ]
})
export class ProcServHistoricModule { }
