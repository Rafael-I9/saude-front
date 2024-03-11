import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PoDynamicFormField, PoTableAction } from '@po-ui/ng-components';
import { TProcessOption, TPageResourceComponent } from '@smart-ui/ng-components';
import { MaintenancePriceTableFilter } from '../services/maintenance-price-table.filter';
import { MaintenancePriceTableFields } from '../services/maintenance-price-table.fields';
import { MaintenancePriceTableService, TableType, ProcessType } from '../services/maintenance-price-table.service';
import { LibService } from '../../../core/lib/lib.service';

@Component({
  selector: 'app-maintenance-price-table-procserv',
  templateUrl: './maintenance-price-table-procserv.component.html',
  styleUrls: ['./maintenance-price-table-procserv.component.scss']
})
export class MaintenancePriceTableProcServComponent implements OnInit {
  @ViewChild(TPageResourceComponent, { static: true }) pageResource!: TPageResourceComponent;
  
  constructor(
    private router: Router,
    private location: Location,
    private libService: LibService,
    private maintenancePriceTableFilter: MaintenancePriceTableFilter,
    private maintenancePriceTableFields: MaintenancePriceTableFields,
    private maintenancePriceTableService: MaintenancePriceTableService
  ) { }

  async ngOnInit() {
    this.pageResource.generateTableActions = () => this.getCustomTableActions();
    this.pageResource.generatePageActions = () => [];
  }

  private getCustomTableActions(): PoTableAction[] {
    return [
      {
        icon: 'po-icon po-icon-history',
        label: '',
        action: (item:any) => this.router.navigate([`${this.location.path()}/detail/${item.id}`])
      }
    ]
  }

  readonly baseUrl = this.maintenancePriceTableService.getBaseUrl();
  readonly serviceApi = 'procserv-tables';
  readonly schemaApi = 'procserv-tables/schema';
  readonly routeResource = "maintenance-price-table-procserv";

  readonly fieldsFilter = this.maintenancePriceTableFilter.getFilterFields();  

  readonly procParametersCopy: Array<PoDynamicFormField> = [
    this.maintenancePriceTableFields.getDestinyTableCode(this.baseUrl + this.serviceApi, 'tableDescription', 'tableCode'),
    this.maintenancePriceTableFields.getValueType(),
    this.maintenancePriceTableFields.getOverwriteDestinyTable(),
    ...this.fieldsFilter
  ];
  
  readonly procParametersDelete: Array<PoDynamicFormField> = [
    ...this.fieldsFilter
  ];

  readonly procParametersReadjust: Array<PoDynamicFormField> = [
    this.maintenancePriceTableFields.getConversionFactor(),
    ...this.fieldsFilter
  ];

  private resources = this.libService.getResource('maintenance-price-table');

  processRes = this.resources['procServ'];
  processResCopy = this.processRes['copy'];
  processResDelete = this.processRes['delete'];
  processResReadjust = this.processRes['readjust'];

  processOptions: TProcessOption[] = [
    {
      icon: 'po-icon po-icon-copy',
      label: this.processResCopy['label'],
      parameters: this.procParametersCopy,
      stepsConfig: {
        opening: {
         title: this.processResCopy['title'],
         text: this.processResCopy['text']
        }
      },
      pTitle: this.processResCopy['pTitle'],
      serviceApi: this.maintenancePriceTableService.getProcessEndpoint(TableType.ProcServ, ProcessType.Copy),
      disableInjectPrimaryKey: true,      
      beforeSend: (model, selectedRows) => this.maintenancePriceTableService.getApiParams(model, selectedRows)
    },
    {
      icon: 'po-icon po-icon-delete',
      label: this.processResDelete['label'],
      parameters: this.procParametersDelete,
      stepsConfig: {
        opening: {
          title: this.processResDelete['title'],
          text: this.processResDelete['text']
         }
       },
       pTitle: this.processResDelete['pTitle'],
      serviceApi: this.maintenancePriceTableService.getProcessEndpoint(TableType.ProcServ, ProcessType.Delete),
      disableInjectPrimaryKey: true,      
      beforeSend: (model, selectedRows) => this.maintenancePriceTableService.getApiParams(model, selectedRows)
    },
    {
      icon: 'po-icon po-icon-calculator',
      label: this.processResReadjust['label'],
      parameters: this.procParametersReadjust,
      stepsConfig: {
        opening: {
          title: this.processResReadjust['title'],
          text: this.processResReadjust['text']
         }
       },
       pTitle: this.processResReadjust['pTitle'],
      serviceApi: this.maintenancePriceTableService.getProcessEndpoint(TableType.ProcServ, ProcessType.Readjust),
      disableInjectPrimaryKey: true,      
      beforeSend: (model, selectedRows) => this.maintenancePriceTableService.getApiParams(model, selectedRows)
    }
  ]

}