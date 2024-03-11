import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./faturamento/maintenance-price-table/procserv/maintenance-price-table-procserv.module').then(x => x.MaintenancePriceTableProcServModule) },
  { path: '', loadChildren: () => import('./faturamento/maintenance-price-table/matmed/maintenance-price-table-matmed.module').then(x => x.MaintenancePriceTableMatMedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
