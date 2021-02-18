import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintainers/users/users.component';
import { HospitalsComponent } from './maintainers/hospitals/hospitals.component';
import { DoctorsComponent } from './maintainers/doctors/doctors.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
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
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}
