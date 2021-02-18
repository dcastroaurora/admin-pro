import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { IncreasingComponent } from './components/increasing/increasing.component';
import { GraphComponent } from './components/graph/graph.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ImageModalComponent } from './components/image-modal/image-modal.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    IncreasingComponent,
    GraphComponent,
    ImageModalComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ChartsModule],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    IncreasingComponent,
    GraphComponent,
    ImageModalComponent,
  ],
})
export class SharedModule {}
