import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from './pages-shared/providers/account-settings/account-settings.service';
import { SidebarService } from './pages-shared/providers/sidebar/sidebar.service';
declare function customInitFunction(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService,
    private accountSettingsService: AccountSettingsService
  ) {}

  ngOnInit(): void {
    customInitFunction();
    this.addClassBody();
    this.sidebarService.chargeMenu();
  }

  addClassBody() {
    const body = document.querySelector('body');
    body?.classList.add('fix-header', 'card-no-border', 'fix-sidebar');
  }
}
