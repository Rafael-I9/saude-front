import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./faturamento/ciha/export-ciha/export-ciha-routing.module').then(
        (x) => x.ExportCihaRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        './faturamento/maintenance-price-table/procserv/maintenance-price-table-procserv.module'
      ).then((x) => x.MaintenancePriceTableProcServModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        './faturamento/maintenance-price-table/matmed/maintenance-price-table-matmed.module'
      ).then((x) => x.MaintenancePriceTableMatMedModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        './faturamento/maintenance-price-table/procserv-historic/procserv-historic.module'
      ).then((x) => x.ProcServHistoricModule),
  },
  {
    path: '',
    loadChildren: () =>
      import(
        './faturamento/folha-producao-prestadores/folha-producao-prestadores.module'
      ).then((x) => x.FolhaProducaoPrestadoresModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
