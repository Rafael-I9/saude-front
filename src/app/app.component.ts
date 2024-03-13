import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { TErpConfigAcessorService } from '@totvs/common-api'
import { LibUtils } from './shared/utils/lib.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private libUtils: LibUtils,
    public config: TErpConfigAcessorService
  ) { }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    { label: this.libUtils.getResourceValue('ciha', 'title'), link: 'export-ciha' },
    { label: this.libUtils.getResourceValue('maintenance-price-table', 'procServ', 'title'), link: 'maintenance-price-table-procserv' },
    { label: this.libUtils.getResourceValue('maintenance-price-table', 'matMed', 'title'), link: 'maintenance-price-table-matmed' },
    { label: this.libUtils.getResourceValue('maintenance-price-table', 'procServ', 'historic'), link: 'procserv-historic' },
  ];

  showMenu!: boolean;

  async ngOnInit(): Promise<void> {
    this.showMenu = this.config.showMenu;
  }
}
