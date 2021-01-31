import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare function customInitFunction(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    customInitFunction();
    this.setThemeLogin();
    this.removeClassBody();
  }

  setThemeLogin() {
    const style = document.querySelector('#themeLogin');
    style?.setAttribute('href', './assets/css/pages/login-register-lock.css');
  }

  removeClassBody() {
    const body = document.querySelector('body');
    body?.removeAttribute('class');
  }

  logIn() {
    this.router.navigateByUrl('/');
  }
}
