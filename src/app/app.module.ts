import { FilterInterceptorHttp } from './shared/interceptor/filter.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TotvsTokenInterceptorHttp } from './totvs-token.interceptor';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaturamentoModule } from './faturamento/faturamento.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoModule,
    HttpClientModule,
    PoTemplatesModule,
    PoCodeEditorModule,
    SmartUIComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [TotvsTokenInterceptorHttp, FilterInterceptorHttp],
  bootstrap: [AppComponent],
})
export class AppModule {}
