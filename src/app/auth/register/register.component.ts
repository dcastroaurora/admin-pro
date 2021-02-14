import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CustomValidations } from 'src/app/utils/custom-validations';
import { RegisterService } from '../auth-shared/providers/register.service';
import { User } from '../auth-shared/interfaces/user.interface';
import { UserModel } from '../auth-shared/models/user.model';
import { Router } from '@angular/router';
declare function customInitFunction(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.createForm();
  }

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

  get name() {
    return this.registerForm.get('name');
  }

  get validName() {
    return this.name?.invalid && (this.name?.dirty || this.name?.touched);
  }

  get email() {
    return this.registerForm.get('email');
  }

  get validEmail() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }

  get password() {
    return this.registerForm.get('password');
  }

  get validPassword() {
    return (
      this.password?.invalid && (this.password?.dirty || this.password?.touched)
    );
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get validConfirmPassword() {
    return (
      this.registerForm.errors?.notMatch &&
      (this.confirmPassword?.dirty || this.confirmPassword?.touched)
    );
  }

  get terms() {
    return this.registerForm.get('terms');
  }

  get validTerms() {
    return !this.terms?.value && (this.terms?.dirty || this.terms?.touched);
  }

  createForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: [''],
        terms: [false, Validators.required],
      },
      {
        validators: CustomValidations.confirmPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  onSubmit() {
    console.log(this.registerForm);
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.registerService.createUser(this.registerForm.value).subscribe(
        () => {
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    }
  }
}
