import { PrestadorComboComponent } from './combos/prestador-combo/prestador-combo.component';
import { PrestadorComboModule } from './combos/prestador-combo/prestador-combo.module';
import { UnidadeFaturamentoComboModule } from './combos/unidade-faturamento-combo/unidade-faturamento-combo.module';
import { ConvenioComboComponent } from './combos/convenio-combo/convenio-combo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeFaturamentoComboComponent } from './combos/unidade-faturamento-combo/unidade-faturamento-combo.component';
import { ConvenioComboModule } from './combos/convenio-combo/unidade-faturamento-combo.module';
import { PrestadorGrupoComboComponent } from './combos/prestador-grupo-combo/prestador-grupo-combo.component';
import { PrestadorGrupoComboModule } from './combos/prestador-grupo-combo/prestador-grupo-combo.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrestadorComboModule,
    UnidadeFaturamentoComboModule,
    ConvenioComboModule,
    PrestadorGrupoComboModule,
  ],
  exports: [
    UnidadeFaturamentoComboComponent,
    ConvenioComboComponent,
    PrestadorComboComponent,
    PrestadorGrupoComboComponent,
  ],
})
export class SharedModule {}
