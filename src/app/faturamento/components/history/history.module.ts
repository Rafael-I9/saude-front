import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { HistoryRoutingModule } from './history-routing.module';
import { TCommonApiModule } from '@totvs/common-api';
import { RequestInterceptorHttp } from '../../../core/interceptors/interceptor';
//import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [
    //HistoryComponent
  ],
  imports: [
    CommonModule,
    SmartUIComponentsModule,
    PoModule,
    HistoryRoutingModule,
    TCommonApiModule
  ],
  providers: [
    RequestInterceptorHttp
  ]
})
export class HistoryModule { }
