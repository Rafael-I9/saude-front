import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { SmartUIComponentsModule } from '@smart-ui/ng-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestInterceptorHttp } from './core/interceptors/interceptor';
import { TCommonApiModule } from '@totvs/common-api';

@NgModule({
  declarations: [
    AppComponent
  ],
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
    TCommonApiModule
  ],
  providers: [
    RequestInterceptorHttp
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
