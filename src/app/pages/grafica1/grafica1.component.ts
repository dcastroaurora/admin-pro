import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.scss'],
})
export class Grafica1Component {
  //Doughnut Chart
  doughnutChartLabels = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  doughnutChartData = [[350, 450, 100]];
  colors = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
    },
  ];

  //Radar Chart
  radarChartOptions = { responsive: true };
  radarChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  radarChartData = [
    { data: [65, 59, 90], label: 'Series A' },
    { data: [28, 48, 100], label: 'Series B' },
  ];
}
