import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../auth-shared/models/user.model';
import { LoginService } from '../auth-shared/providers/login.service';
declare function customInitFunction(): any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  public auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private ngZone: NgZone
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    customInitFunction();
    this.setThemeLogin();
    this.removeClassBody();
    this.renderButton();
  }

  setThemeLogin() {
    const style = document.querySelector('#themeLogin');
    style?.setAttribute('href', './assets/css/pages/login-register-lock.css');
  }

  removeClassBody() {
    const body = document.querySelector('body');
    body?.removeAttribute('class');
  }

  ngSubmit() {
    console.log(this.loginForm);
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        () => {
          if (this.remember?.value) {
            localStorage.setItem('email', this.email?.value);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get validEmail() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get validEmailRequired() {
    return (
      this.email?.errors?.required && (this.email?.dirty || this.email?.touched)
    );
  }

  get validGmailFormat() {
    return (
      this.email?.errors?.email && (this.email?.dirty || this.email?.touched)
    );
  }

  get password() {
    return this.loginForm.get('password');
  }

  get validPassword() {
    return (
      this.password?.invalid && (this.password?.dirty || this.password?.touched)
    );
  }

  get remember() {
    return this.loginForm.get('remember');
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [
        localStorage.getItem('email') || '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      remember: [localStorage.getItem('email') ? true : false],
    });
  }

  renderButton() {
    gapi.signin2.render('signin-google', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.loginService.googleInit();
    this.auth2 = this.loginService.auth2;
    this.attachSignin(document.getElementById('signin-google'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        var token = googleUser.getAuthResponse().id_token;

        this.loginService.loginGoogle(token).subscribe(
          () => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/dashboard');
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', error.error.message, 'error');
          }
        );
      },
      (error: any) => {
        Swal.fire('Error', JSON.stringify(error, undefined, 2), 'error');
      }
    );
  }
}
