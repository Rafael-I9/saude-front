import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceRoutePath, TGridResourceComponent } from '@smart-ui/ng-components';
import { MaintenancePriceTableMatMedComponent } from './maintenance-price-table-matmed.component';

const routes: Routes = [
  {
    path: 'maintenance-price-table-matmed', component: MaintenancePriceTableMatMedComponent,
    children: [
      { path: ResourceRoutePath.list, component: TGridResourceComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancePriceTableMatMedRoutingModule { }
