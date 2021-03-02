import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintainers/users/users.component';
import { HospitalsComponent } from './maintainers/hospitals/hospitals.component';
import { DoctorsComponent } from './maintainers/doctors/doctors.component';
import { DoctorComponent } from './maintainers/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'chart', component: Grafica1Component, data: { title: 'Chart' } },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Account Settings' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'User Profile' },
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'User Maintainer' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Hospital Maintainer' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Doctor Maintainer' },
  },
  {
    path: 'doctors/:id',
    component: DoctorComponent,
    data: { title: 'Create Doctor' },
  },
  {
    path: 'search/:value',
    component: SearchComponent,
    data: { title: 'Searching' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
})
export class ChildRoutesModule {}
