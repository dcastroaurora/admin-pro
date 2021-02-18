import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartType, RadialChartOptions, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent {
  @Input() title: string = '';
  @Input() graph: ChartType = 'bar';
  @Input() chartLabels: Label[] = [];

  //Doughnut Chart
  @Input() doughnutChartData?: MultiDataSet;
  @Input() colors: Color[] = [];

  //Radar Chart
  @Input() radarChartOptions: RadialChartOptions = {};
  @Input() radarChartData: ChartDataSets[] = [];
}
