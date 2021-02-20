import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintainers/users/users.component';
import { DoctorsComponent } from './maintainers/doctors/doctors.component';
import { HospitalsComponent } from './maintainers/hospitals/hospitals.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DoctorComponent } from './maintainers/doctors/doctor/doctor.component';

@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsersComponent,
    DoctorsComponent,
    HospitalsComponent,
    DoctorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    PipesModule,
  ],
})
export class PagesModule {}
