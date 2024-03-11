import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceRoutePath, TDetailResourceComponent, TGridResourceComponent } from '@smart-ui/ng-components';
import { MaintenancePriceTableProcServComponent } from './maintenance-price-table-procserv.component';

const routes: Routes = [
  {
    path: 'maintenance-price-table-procserv', component: MaintenancePriceTableProcServComponent,
    children: [
      { path: ResourceRoutePath.list, component: TGridResourceComponent },
      { path: ResourceRoutePath.detail, component: TDetailResourceComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancePriceTableProcServRoutingModule { }
