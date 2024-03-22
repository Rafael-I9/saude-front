import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { TErpConfigAcessorService } from '@totvs/common-api';
import { LibUtils } from './shared/utils/lib.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public showMenu: boolean;

  constructor(
    private libUtils: LibUtils,
    public config: TErpConfigAcessorService
  ) {
    this.showMenu = this.config.showMenu;
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    {
      label: this.libUtils.getResourceValue('ciha', 'title'),
      link: 'export-ciha',
    },
    {
      label: this.libUtils.getResourceValue(
        'folha-producao-prestador',
        'title'
      ),
      link: 'production-sheet-providers',
    },
    {
      label: this.libUtils.getResourceValue('maintenance-price-table', 'title'),
      subItems: [
        {
          label: this.libUtils.getResourceValue(
            'maintenance-price-table',
            'procServ',
            'title'
          ),
          link: 'maintenance-price-table-procserv',
        },
        {
          label: this.libUtils.getResourceValue(
            'maintenance-price-table',
            'matMed',
            'title'
          ),
          link: 'maintenance-price-table-matmed',
        },
        {
          label: this.libUtils.getResourceValue(
            'maintenance-price-table',
            'procServ',
            'historic',
            'title'
          ),
          link: 'procserv-historic',
        },
      ],
    },
  ];
}
