import { Component, OnInit, Input } from '@angular/core';
import { RowData } from '../model/RowData';
import { ChartOptions, ChartData } from 'chart.js';
import { EDataSource } from '../model/EDataSource';

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
      label: EDataSource[EDataSource.Expenses],
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
      label: EDataSource[EDataSource.Income],
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
      label: EDataSource[EDataSource.Wallet],
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

  render() {
    const expensesChartData = this.generateChartDataFromRowDataArray(
      this.expensesData
    );
    const incomeChartData = this.generateChartDataFromRowDataArray(
      this.incomeData
    );
    const chartData = [];
    chartData.push({
      data: expensesChartData,
      label: EDataSource[EDataSource.Expenses],
    });
    chartData.push({
      data: incomeChartData,
      label: EDataSource[EDataSource.Income],
    });
    chartData.push({
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
      label: EDataSource[EDataSource.Wallet],
    });
    this.data = chartData;
    this.debug();
  }
  generateChartDataFromRowDataArray(rowDataArr: Array<RowData>) {
    const data = [];
    rowDataArr.forEach((row) => {
      data.push({
        x: row.date,
        y: row.amount,
      });
    });
    return data;
  }

  debug() {
    console.log(this.incomeData);
    console.log(this.expensesData);
  }
}
