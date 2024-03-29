import { Component, OnInit, ViewChild } from '@angular/core';
import { PoDynamicFormField  } from '@po-ui/ng-components';
import { TProcessOption, TPageResourceComponent, TGridResourceColumn } from '@smart-ui/ng-components';
import { MaintenancePriceTableFilter, FilterType } from '../services/maintenance-price-table.filter';
import { MaintenancePriceTableFields } from '../services/maintenance-price-table.fields';
import { MaintenancePriceTableService, TableType, ProcessType } from '../services/maintenance-price-table.service';
import { LibUtils } from 'src/app/shared/utils/lib.utils';

@Component({
  selector: 'app-maintenance-price-table-matmed',
  templateUrl: './maintenance-price-table-matmed.component.html',
  styleUrls: ['./maintenance-price-table-matmed.component.scss']
})
export class MaintenancePriceTableMatMedComponent implements OnInit {
  @ViewChild(TPageResourceComponent, { static: true }) pageResource!: TPageResourceComponent;

  constructor(
    private libUtils: LibUtils,
    private maintenancePriceTableFilter: MaintenancePriceTableFilter,
    private maintenancePriceTableFields: MaintenancePriceTableFields,
    private maintenancePriceTableService: MaintenancePriceTableService
  ) { }

  async ngOnInit() {
    this.pageResource.generateTableActions = () => [];
    this.pageResource.generatePageActions = () => [];
  }

  readonly baseUrl = this.maintenancePriceTableService.getBaseUrl();
  readonly serviceApi = 'matmed-tables';
  readonly schemaApi = 'matmed-tables/schema';
  readonly routeResource = "maintenance-price-table-matmed";

  readonly fieldsFilter = this.maintenancePriceTableFilter.getFilterFields([FilterType.Total, FilterType.Range]);
  
  readonly procParametersCopy: Array<PoDynamicFormField> = [
    this.maintenancePriceTableFields.getDestinyTableCode(this.baseUrl + this.serviceApi, 'tabMatmedDescription', 'tabMatmedCode'),
    this.maintenancePriceTableFields.getValueType(),
    this.maintenancePriceTableFields.getOverwriteDestinyTable(),
    ...this.fieldsFilter
  ];
  
  readonly procParametersDelete: Array<PoDynamicFormField> = [
    ...this.fieldsFilter
  ];

  private resources = this.libUtils.getResource('maintenance-price-table');

  processRes = this.resources['procServ'];
  processResCopy = this.processRes['copy'];
  processResDelete = this.processRes['delete'];

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
      serviceApi: this.maintenancePriceTableService.getProcessEndpoint(TableType.MatMed, ProcessType.Copy),
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
      serviceApi: this.maintenancePriceTableService.getProcessEndpoint(TableType.MatMed, ProcessType.Delete),
      disableInjectPrimaryKey: true,      
      beforeSend: (model, selectedRows) => this.maintenancePriceTableService.getApiParams(model, selectedRows)
    }
  ]

  readonly columns: TGridResourceColumn[] = [
    {
      property: 'atuAutoBrasindice',
      visible: false
    },
    {
      property: 'atuAuto',
      visible: false
    },
    {
      property: 'atuAutoSimpro',
      visible: false
    }
  ];
}