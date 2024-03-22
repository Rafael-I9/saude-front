import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TCommonApiModule } from '@totvs/common-api';
import { ExportCihaModule } from './ciha/export-ciha/export-ciha.module';
import { FolhaProducaoPrestadoresModule } from './folha-producao-prestadores/folha-producao-prestadores.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TCommonApiModule],
  exports: [ExportCihaModule, FolhaProducaoPrestadoresModule],
})
export class FaturamentoModule {}
