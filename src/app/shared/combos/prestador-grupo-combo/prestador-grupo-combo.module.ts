import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestadorGrupoComboComponent } from './prestador-grupo-combo.component';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PrestadorGrupoComboComponent],
  imports: [CommonModule, PoModule, PoFieldModule, FormsModule],
  exports: [PrestadorGrupoComboComponent],
})
export class PrestadorGrupoComboModule {}
