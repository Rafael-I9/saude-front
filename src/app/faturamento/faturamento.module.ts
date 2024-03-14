import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TCommonApiModule } from '@totvs/common-api';
import { ExportCihaModule } from './ciha/export-ciha/export-ciha.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TCommonApiModule
  ],
})
export class FaturamentoModule {}
