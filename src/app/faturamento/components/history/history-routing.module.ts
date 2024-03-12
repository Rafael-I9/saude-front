import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceRoutePath, TGridResourceComponent } from '@smart-ui/ng-components';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  {
    path: 'history', component: HistoryComponent,
    children: [
      { path: ResourceRoutePath.list, component: TGridResourceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
