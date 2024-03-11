import { Injectable } from '@angular/core';
import { PoNotificationService, } from '@po-ui/ng-components';
import { ConfigService } from '../../../core/config/config.service';
import { LibService } from '../../../core/lib/lib.service';

export enum TableType {
  ProcServ = 'procserv',
  MatMed = 'matmed'
}

export enum ProcessType {
  Copy = 'copy',
  Delete = 'delete',
  Readjust = 'readjust'
}

@Injectable({
  providedIn: 'root'
})
export class MaintenancePriceTableService {
  private resources: any;

  constructor(
    private libService: LibService,
    private poNotification: PoNotificationService,
    private configService: ConfigService
  ) {
    this.resources = this.libService.getResource('maintenance-price-table');
  }

  getOriginTableCode(selectedRows: any): string | number {
    const errorMessage = selectedRows == null || selectedRows.length < 1
      ? this.resources['selectOneItem']
      : selectedRows.length > 1
      ? this.resources['selectOnlyOneItem']
      : '';
    
    if (errorMessage != '')
    {
      this.poNotification.information(errorMessage);
      throw new Error(errorMessage);
    }

    return selectedRows[0].tableCode;
  }

  getApiParams(model: any, selectedRows: any) {
    return {
      "CompanyId": this.configService.companyId,
      "OriginTableCode": this.getOriginTableCode(selectedRows),
      ...model.executionParameter
    };
  }

  getProcessEndpoint(tableType: TableType, processType: ProcessType): string {
    return `${this.getBaseUrl()}maintenance-price-tables/${tableType}/${processType}`;
  }

  getBaseUrl(): string {
    return this.configService.fullApiUrl;    
  }

  getServiceApiUrl(service: string): string {
    return this.getBaseUrl() + service;
  }

  getSchemaApiUrl(service: string): string {
    return this.getServiceApiUrl(service) + '/schema';
  }
  
}