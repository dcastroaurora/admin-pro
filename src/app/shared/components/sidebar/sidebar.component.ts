import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth-shared/interfaces/user.interface';
import { UserService } from 'src/app/auth/auth-shared/providers/user.service';
import { SidebarService } from 'src/app/pages/pages-shared/providers/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  user!: User;
  // image: string = '';

  constructor(
    private sidebarService: SidebarService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
    this.setUserData();
    // this.showUserImage();
  }

  setUserData() {
    this.user = this.userService.user;
  }

  // showUserImage() {
  // this.image = this.userService.getUserImage();
  // }
}
