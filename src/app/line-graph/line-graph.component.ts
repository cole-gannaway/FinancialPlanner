import { Component, OnInit, Input } from '@angular/core';
import { RowData } from '../model/RowData';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

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
          y: -1,
        },
        {
          x: new Date().setDate(2),
          y: -2,
        },
      ],
      label: 'Expenses',
    },
    {
      data: [
        {
          x: new Date(),
          y: 10,
        },
        {
          x: new Date().setDate(2),
          y: 2,
        },
      ],
      label: 'Income',
    },
    {
      data: [
        {
          x: new Date(),
          y: -2,
        },
        {
          x: new Date().setDate(2),
          y: 2,
        },
      ],
      label: 'Wallet',
    },
  ];
  lineChartOptions: ChartOptions = {
    responsive: true,
    title: {},
    legend: {
      labels: {
        fontColor: 'white',
      },
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          ticks: {
            source: 'auto',
            fontColor: '#fff',
          },
          gridLines: {
            color: '#d7d7d7e2',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: '#fff',
          },
          gridLines: {
            color: '#d7d7d7e2',
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
