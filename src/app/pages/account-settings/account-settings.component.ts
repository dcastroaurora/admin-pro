import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from '../pages-shared/providers/account-settings/account-settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  constructor(private accountSettingsService: AccountSettingsService) {}

  ngOnInit(): void {
    this.accountSettingsService.setCheckTheme();
  }

  changeTheme(theme: string) {
    this.accountSettingsService.changeTheme(theme);
  }
}
