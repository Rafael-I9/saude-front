import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeFaturamentoComboComponent } from './unidade-faturamento-combo/unidade-faturamento-combo.component';
import { PoModule, PoFieldModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UnidadeFaturamentoComboComponent],
  imports: [CommonModule, PoModule, PoFieldModule, FormsModule],
  exports: [UnidadeFaturamentoComboComponent],
})
export class SharedModule {}
