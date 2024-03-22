import { PrestadorComboComponent } from './prestador-combo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PrestadorComboComponent],
  imports: [CommonModule, PoModule, PoFieldModule, FormsModule],
  exports: [PrestadorComboComponent],
})
export class PrestadorComboModule {}
