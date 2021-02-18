import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/auth-shared/models/user.model';
import { AuthService } from 'src/app/auth/auth-shared/providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setUserData();
  }

  setUserData() {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
