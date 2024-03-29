import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { PoDynamicFormField, PoSelectOption, ForceOptionComponentEnum } from '@po-ui/ng-components';
import { LibUtils } from '../../../shared/utils/lib.utils';

export enum FilterType {
  Total     = 'T',
  Specialty = 'E',
  Group     = 'G',
  Range     = 'F',
}

@Injectable({
  providedIn: 'root'
})
export class MaintenancePriceTableFilter {
  public renderer: Renderer2;
  private resources: any;

  constructor(private libUtils: LibUtils, private rendererFactory: RendererFactory2) {
    this.resources = this.libUtils.getResource('maintenance-price-table');
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  getOptions(options:Array<FilterType> | undefined) {
    return options == null || options == undefined ? Object.values(FilterType) : options;
  }

  enableField(name:string, enabled:boolean) {
    try {
      let edit = this.renderer.selectRootElement('input[name="'+name+'"]');
      edit.disabled = !enabled;
    } catch (e) {
      /**
       * Este método gera erro caso o objeto não exista,
       * como não há outro método para verificar se existe, usando o mesmo antes da obtenção do elemento,
       * adicionei este tratamento.
       */
    }
  }

  onChangeFilterType(changeValue: any) {
    this.enableField('FilterSpecialtyCode',  changeValue.value == FilterType.Specialty || changeValue.value == FilterType.Group);
    this.enableField('FilterItensGroupCode', changeValue.value == FilterType.Group);
    this.enableField('FilterStartRangeCode', changeValue.value == FilterType.Range);
    this.enableField('FilterEndRangeCode',   changeValue.value == FilterType.Range);
  }

  getFilterDescription(filterType: FilterType) {
    const res = this.resources['fieldOptions']['filterType'];

    switch (filterType) {
      case FilterType.Total:     return res['total'];
      case FilterType.Specialty: return res['specialty'];
      case FilterType.Group:     return res['group'];
      case FilterType.Range:     return res['range'];
      default:                   return '';
    }
  }

  getFilterOptions(options:Array<FilterType> | undefined): Array<PoSelectOption> {
    let result: Array<PoSelectOption> = [];

    this.getOptions(options).forEach((item) => {
      result.push({ value: item, label: this.getFilterDescription(item) });
    });

    return result;
  }

  addField(
    filterFields: Array<PoDynamicFormField>,
    options: Array<FilterType> | undefined = undefined,
    filterType: FilterType,
    property: string,
    label: string,
    order: number
  ) {
    if (this.getOptions(options).includes(filterType))
      filterFields.push({
        order: order,
        property: property,
        label: this.resources['fields'][label],
        required: true,
        gridColumns: 6,
        gridSmColumns: 6,
        disabled: true
      });
  }

  getFilterFields(options:Array<FilterType> | undefined = undefined): Array<PoDynamicFormField> {
    let filterFields: Array<PoDynamicFormField> = [];

    this.addField(filterFields, options, FilterType.Specialty, 'FilterSpecialtyCode',  'filterSpecialty',  991);
    this.addField(filterFields, options, FilterType.Group,     'FilterItensGroupCode', 'filterGroup',      992);
    this.addField(filterFields, options, FilterType.Range,     'FilterStartRangeCode', 'filterStartRange', 993);
    this.addField(filterFields, options, FilterType.Range,     'FilterEndRangeCode',   'filterEndRange',   994);

    return [
      {
        divider: this.resources['filterDivider'],
        order: 990,
        property: 'FilterFilterType',
        label: this.resources['fields']['filterType'],
        required: true,
        gridColumns: 12,
        gridSmColumns: 12,
        forceOptionsComponentType: ForceOptionComponentEnum.select,
        options: this.getFilterOptions(options),
        validate: this.onChangeFilterType.bind(this)
      },
      ...filterFields
    ]
  }
}