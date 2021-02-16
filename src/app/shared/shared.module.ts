import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrumbsComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbsComponent, SidebarComponent, HeaderComponent],
})
export class SharedModule {}
