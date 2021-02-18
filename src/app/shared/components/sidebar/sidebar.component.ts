import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth-shared/models/user.model';
import { AuthService } from 'src/app/auth/auth-shared/providers/auth.service';
import { SidebarService } from 'src/app/pages/pages-shared/providers/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  user!: User;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    this.setUserData();
  }

  setUserData() {
    this.user = this.authService.user;
  }
}
