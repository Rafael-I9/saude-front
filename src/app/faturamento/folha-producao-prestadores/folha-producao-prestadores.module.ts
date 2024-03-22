import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolhaProducaoPrestadoresComponent } from './folha-producao-prestadores.component';
import { TotvsTokenInterceptorHttp } from 'src/app/shared/interceptor/totvs-token.interceptor';
import { FolhaProducaoPrestadoresRoutingModule } from './folha-producao-prestadores-routing.module';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FolhaProducaoPrestadoresComponent],
  imports: [
    CommonModule,
    FolhaProducaoPrestadoresRoutingModule,
    FormsModule,
    SharedModule,
    PoModule,
  ],
  providers: [TotvsTokenInterceptorHttp],
})
export class FolhaProducaoPrestadoresModule {}
