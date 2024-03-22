import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { ConvenioComboComponent } from './convenio-combo.component';

@NgModule({
  declarations: [ConvenioComboComponent],
  imports: [CommonModule, PoModule, PoFieldModule, FormsModule],
  exports: [ConvenioComboComponent],
})
export class ConvenioComboModule {}
