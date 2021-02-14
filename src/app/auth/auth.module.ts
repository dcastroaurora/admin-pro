import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//El FormsModule no permite que recargue la pagina con el button submit
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  // exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
