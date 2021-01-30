import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from './pages-shared/providers/account-settings/account-settings.service';
declare function customInitFunction(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private accountSettingsService: AccountSettingsService) {}

  ngOnInit(): void {
    customInitFunction();
    this.addClassBody();
  }

  addClassBody() {
    const body = document.querySelector('body');
    body?.classList.add('fix-header', 'card-no-border', 'fix-sidebar');
  }
}
