import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { TotvsTokenInterceptorHttp } from 'src/app/shared/interceptor/totvs-token.interceptor';
import { ExportCihaComponent } from './export-ciha.component';
import { ExportCihaRoutingModule } from './export-ciha-routing.module';
import { ExportCihaFiltrosComponent } from './export-ciha-filtros/export-ciha-filtros.component';
import { FormsModule } from '@angular/forms';
import { PoPageDynamicTableModule, PoPageJobSchedulerModule } from '@po-ui/ng-templates';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ExportCihaComponent, ExportCihaFiltrosComponent],
  imports: [
    CommonModule,
    SmartUIComponentsModule,
    PoModule,
    FormsModule,
    ExportCihaRoutingModule,
    PoPageDynamicTableModule,
    PoPageJobSchedulerModule,
    SharedModule,
  ],
  providers: [TotvsTokenInterceptorHttp],
})
export class ExportCihaModule {}
