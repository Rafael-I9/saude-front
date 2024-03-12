import { Component, OnInit } from '@angular/core';
import { PoBreadcrumbItem } from '@po-ui/ng-components';
import { HistoryComponent } from '../../components/history/history.component';

@Component({
  selector: 'app-procserv-historic',
  templateUrl: '../../components/history/history.component.html',
  styleUrls: ['../../components/history/history.component.scss']
})
export class ProcServHistoricComponent extends HistoryComponent implements OnInit {
  public override serviceApi = 'procserv-tables/historic';
  public override schemaApi = 'procserv-tables/historic/schema';
  public override backApi = 'maintenance-price-table-procserv';

  public override setServiceApi() {
    const queryParams = (this.pageResource as any)?.router?.browserUrlTree?.queryParams;
    const companyId = queryParams ? queryParams.companyId : 0;
    const tableCode = queryParams ? queryParams.tableCode : '';
    this.serviceApi = `procserv-tables/historic?companyId=${companyId}&tableCode=${tableCode}`;
  }

  override breadcrumbItems : Array<PoBreadcrumbItem> = [
    { label: 'Manutenção Tabela Preço', link: '/'+this.backApi},
    { label: 'Histórico', link: '' }
  ];
}