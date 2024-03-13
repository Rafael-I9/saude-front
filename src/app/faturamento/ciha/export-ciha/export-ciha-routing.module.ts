import { PoModule } from '@po-ui/ng-components';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {
  ResourceRoutePath,
  TDetailResourceComponent,
  TEditResourceComponent,
  TGridResourceComponent,
} from '@smart-ui/ng-components';

import { ExportCihaComponent } from './export-ciha.component';

const routes: Routes = [
  {
    path: 'export-ciha',
    component: ExportCihaComponent,
    children: [
      { path: ResourceRoutePath.list, component: TGridResourceComponent },
      { path: ResourceRoutePath.new, component: TEditResourceComponent },
      {
        path: `${ResourceRoutePath.new}/:id`,
        component: TEditResourceComponent,
      },
      { path: ResourceRoutePath.edit, component: TEditResourceComponent },
      { path: ResourceRoutePath.detail, component: TDetailResourceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportCihaRoutingModule {}
