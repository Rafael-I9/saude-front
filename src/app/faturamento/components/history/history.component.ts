import { Component, OnInit, ViewChild } from '@angular/core';
import { TPageResourceComponent } from '@smart-ui/ng-components';
import { PoBreadcrumbItem } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { ConfigService } from '../../../core/config/config.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @ViewChild(TPageResourceComponent, { static: true })
  pageResource!: TPageResourceComponent;

  constructor(private router: Router, private configService: ConfigService) {}

  public baseUrl: string = this.configService.fullApiUrl;
  public serviceApi: string = '';
  public schemaApi: string = '';
  public backApi: string = '';

  async ngOnInit() {
    this.pageResource.generateTableActions = () => [];
    this.pageResource.generatePageActions = () => [];
    this.setServiceApi();
  }

  public setServiceApi() {
    this.serviceApi = '';
  }

  /**
   * Exemplo:
   * public breadcrumbItems : Array<PoBreadcrumbItem> = [
       { label: 'Manutenção Tabela Preço', link: '/'+this.backApi},
       { label: 'Histórico', link: '' }
     ];
   */
  public breadcrumbItems: Array<PoBreadcrumbItem> | null = null;

  public onBack() {
    this.router.navigate([this.backApi]);
  }
}
