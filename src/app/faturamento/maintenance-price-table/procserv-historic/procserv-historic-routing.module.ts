import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceRoutePath, TGridResourceComponent } from '@smart-ui/ng-components';
import { ProcServHistoricComponent } from './procserv-historic.component';

const routes: Routes = [
  {
    path: 'procserv-historic', component: ProcServHistoricComponent,
    children: [
      { path: ResourceRoutePath.list, component: TGridResourceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcServHistoricRoutingModule { }
