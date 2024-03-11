import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { TErpConfigAcessorService } from '@totvs/common-api'
import { LibService } from './core/lib/lib.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // private resources = this.libService.getResource();

  // constructor(private libService: LibService, public config: TErpConfigAcessorService) { }

  // readonly menus: Array<PoMenuItem> = [
  //   { label: 'Home', link: '/' },
  //   { label: this.resources['procServ']['title'], link: 'maintenance-price-table-procserv' },
  //   { label: this.resources['matMed']['title'], link: 'maintenance-price-table-matmed' }
  // ];

  // showMenu!: boolean;

  // async ngOnInit(): Promise<void> {
  //   this.showMenu = this.config.showMenu;
  // }


  constructor(private libService: LibService, public config: TErpConfigAcessorService) { }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/' },
    { label: this.libService.getResourceValue('maintenance-price-table', 'procServ', 'title'), link: 'maintenance-price-table-procserv' },
    { label: this.libService.getResourceValue('maintenance-price-table', 'matMed', 'title'), link: 'maintenance-price-table-matmed' }
  ];

  showMenu!: boolean;

  async ngOnInit(): Promise<void> {
    this.showMenu = this.config.showMenu;
  }
}
