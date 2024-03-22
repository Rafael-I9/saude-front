import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolhaProducaoPrestadoresComponent } from './folha-producao-prestadores.component';

const routes: Routes = [
  {
    path: 'production-sheet-providers',
    component: FolhaProducaoPrestadoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolhaProducaoPrestadoresRoutingModule {}
