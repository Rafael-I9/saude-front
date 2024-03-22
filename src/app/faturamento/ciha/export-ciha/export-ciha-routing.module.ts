import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportCihaComponent } from './export-ciha.component';

const routes: Routes = [
  {
    path: 'export-ciha',
    component: ExportCihaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportCihaRoutingModule {}
