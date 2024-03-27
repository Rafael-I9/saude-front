import { Injectable } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { ConfigService } from '../../../core/config/config.service';
import { LibUtils } from 'src/app/shared/utils/lib.utils';

export enum TableType {
  ProcServ = 'procserv',
  MatMed = 'matmed',
}

export enum ProcessType {
  Copy = 'copy',
  Delete = 'delete',
  Readjust = 'readjust',
}

@Injectable({
  providedIn: 'root',
})
export class MaintenancePriceTableService {
  private resources: any;

  constructor(
    private libUtils: LibUtils,
    private poNotification: PoNotificationService,
    private configService: ConfigService
  ) {
    this.resources = this.libUtils.getResource('maintenance-price-table');
  }

  private getOriginTableCode(selectedRows: any): string | number {
    const errorMessage =
      selectedRows == null || selectedRows.length < 1
        ? this.resources['selectOneItem']
        : selectedRows.length > 1
        ? this.resources['selectOnlyOneItem']
        : '';

    if (errorMessage != '') {
      this.poNotification.information(errorMessage);
      throw new Error(errorMessage);
    }

    return selectedRows[0].tableCode;
  }

  private extractTableCode(value: string): string {
    if (value.includes('|')) return value.split('|')[1];

    return value;
  }

  public getApiParams(model: any, selectedRows: any) {
    let obj = {
      CompanyId: this.configService.companyId,
      OriginTableCode: this.getOriginTableCode(selectedRows),
      ...model.executionParameter,
      Filter: this.getFilter(model),
    };

    obj.OriginTableCode = this.extractTableCode(obj.OriginTableCode);

    if (obj.DestinyTableCode)
      obj.DestinyTableCode = this.extractTableCode(obj.DestinyTableCode);

    return obj;
  }

  public getFilter(model: any) {
    const param = model.executionParameter;

    let obj: any = {};
    obj.FilterType = param.FilterFilterType;

    if (param.FilterSpecialtyCode)
      obj.SpecialtyCode = param.FilterSpecialtyCode;
    if (param.FilterItensGroupCode)
      obj.ItensGroupCode = param.FilterItensGroupCode;
    if (param.FilterStartRangeCode)
      obj.StartRangeCode = param.FilterStartRangeCode;
    if (param.FilterEndRangeCode) obj.EndRangeCode = param.FilterEndRangeCode;

    return obj;
  }

  public getProcessEndpoint(
    tableType: TableType,
    processType: ProcessType
  ): string {
    return `${this.getBaseUrl()}maintenance-price-tables/${tableType}/${processType}`;
  }

  public getBaseUrl(): string {
    this.configService.fullApiUrl;
    return this.configService.fullApiUrl;
  }

  public getServiceApiUrl(service: string): string {
    return this.getBaseUrl() + service;
  }

  public getSchemaApiUrl(service: string): string {
    return this.getServiceApiUrl(service) + '/schema';
  }
}
