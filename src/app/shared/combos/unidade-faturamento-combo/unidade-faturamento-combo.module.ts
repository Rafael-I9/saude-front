import { UnidadeFaturamentoComboComponent } from './unidade-faturamento-combo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UnidadeFaturamentoComboComponent],
  imports: [CommonModule, PoModule, PoFieldModule, FormsModule],
  exports: [UnidadeFaturamentoComboComponent],
})
export class UnidadeFaturamentoComboModule {}
