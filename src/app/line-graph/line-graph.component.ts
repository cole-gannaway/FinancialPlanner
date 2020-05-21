import { Component, OnInit, Input } from '@angular/core';
import { RowData } from '../model/RowData';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css'],
})
export class LineGraphComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('incomeData') incomeData: Array<RowData>;
  // tslint:disable-next-line: no-input-rename
  @Input('expensesData') expensesData: Array<RowData>;
  data = [
    {
      data: [
        {
          x: new Date(),
          y: 1,
        },
        {
          x: new Date().setDate(2),
          y: 2,
        },
      ],
      label: 'Series A',
    },
  ];
  lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          ticks: {
            source: 'auto',
          },
        },
      ],
    },
  };
  lineChartType = 'line';
  lineChartLegend = true;

  constructor() {}

  ngOnInit(): void {}
}
