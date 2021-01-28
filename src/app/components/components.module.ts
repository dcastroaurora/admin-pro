import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreasingComponent } from './increasing/increasing.component';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncreasingComponent, GraphComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [IncreasingComponent, GraphComponent],
})
export class ComponentsModule {}
