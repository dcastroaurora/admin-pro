import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth-shared/interfaces/user.interface';
import { UserService } from 'src/app/auth/auth-shared/providers/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  image: string = '';
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.setUserData();
    // this.showUserImage();
  }

  setUserData() {
    this.user = this.userService.user;
  }

  // showUserImage() {
  // this.image = this.userService.getUserImage();
  // }

  logout() {
    this.userService.logout();
  }
}
