import { Injectable } from '@angular/core';
import { PoDynamicFormField } from '@po-ui/ng-components';
import { LibService } from '../../../core/lib/lib.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenancePriceTableFields {
  private resources: any;

  constructor (private libService: LibService) {
    this.resources = this.libService.getResource('maintenance-price-table');
  }  

  getDestinyTableCode(optionsService:string, fieldLabel:string, fieldValue:string):PoDynamicFormField {
    return {
      order: 1,
      property: 'DestinyTableCode',
      label: this.resources['fields']['destinyTableCode'],
      required: true,
      gridColumns: 12,
      gridSmColumns: 12,
      optionsService: optionsService,
      fieldLabel: fieldLabel,
      fieldValue: fieldValue,
      optionsMulti: false
    }
  }

  getValueType():PoDynamicFormField {
    return {
      order: 2,
      property: 'ValueType',
      label: this.resources['fields']['valueType'],
      required: true,
      gridColumns: 8,
      gridSmColumns: 8,
      options: [
        { value: 'P', label: 'Preservar' },
        { value: 'C', label: 'Criar' }
      ]
    }
  }

  getOverwriteDestinyTable():PoDynamicFormField {
    return {
      order: 3,
      property: 'OverwriteDestinyTable',
      label: this.resources['fields']['overwriteDestinyTable'],
      type: 'boolean',
      gridColumns: 4,
      gridSmColumns: 4
    }
  }

  getConversionFactor():PoDynamicFormField {
    return {
      order: 3,
      property: 'conversionFactor',
      label: this.resources['fields']['conversionFactor'],
      type: 'number',
      gridColumns: 6,
      gridSmColumns: 6
    }
  }

}