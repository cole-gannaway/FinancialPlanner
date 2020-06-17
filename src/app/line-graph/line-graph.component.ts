import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { EDataSource } from '../model/EDataSource';
import { ILineChartData } from '../model/ILineChartData';

import { EAggregateDateOption } from '../model/EAggregateDateOption';
import { IRowData } from '../model/IRowData';
import { DateUtils } from '../utils/date/date-utils';
import { LineGraphUtils } from '../utils/line-graph-utils/line-graph-utils';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css'],
})
export class LineGraphComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('incomeData') incomeData: Array<IRowData>;
  // tslint:disable-next-line: no-input-rename
  @Input('expensesData') expensesData: Array<IRowData>;
  data = [
    {
      data: [],
      label: EDataSource[EDataSource.Expenses],
    },
    {
      data: [],
      label: EDataSource[EDataSource.Income],
    },
    {
      data: [],
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

  maxDate: Date = new Date();
  minDate: Date;

  constructor() {}

  ngOnInit(): void {
    // push out one week
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  render() {
    // generate expenses data for chart
    const expensesChartData: ILineChartData[] = LineGraphUtils.generateChartDataFromRowDataArray(
      this.expensesData,
      this.maxDate
    );
    expensesChartData.forEach((value) => {
      value.y = value.y * -1;
    });
    // generate income data for chart
    const incomeChartData: ILineChartData[] = LineGraphUtils.generateChartDataFromRowDataArray(
      this.incomeData,
      this.maxDate
    );

    // aggregate all data
    const aggregateOption = EAggregateDateOption.DAY;
    const incomeChartMap = LineGraphUtils.aggregateChartDataBy(
      incomeChartData,
      aggregateOption
    );
    const expensesChartMap = LineGraphUtils.aggregateChartDataBy(
      expensesChartData,
      aggregateOption
    );

    // convert maps back to chartData
    const finalExpensesChartData = LineGraphUtils.convertMapToChartData(
      expensesChartMap
    );
    const finalIncomeChartData = LineGraphUtils.convertMapToChartData(
      incomeChartMap
    );

    // sort by date
    finalIncomeChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });
    finalExpensesChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });

    // create walletMap
    const walletChartMap = new Map<string, number>();
    incomeChartMap.forEach((value: number, key: string) => {
      LineGraphUtils.appendToMap(walletChartMap, key, value);
    });
    expensesChartMap.forEach((value: number, key: string) => {
      LineGraphUtils.appendToMap(walletChartMap, key, value);
    });
    // create walletChartData
    const walletChartData = LineGraphUtils.convertMapToChartData(
      walletChartMap
    );
    walletChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });
    const initialWalletValue = 0;
    const finalWalletChartData = LineGraphUtils.generateChartDataFromDeltas(
      initialWalletValue,
      walletChartData
    );

    // combine chartData
    const chartData = [];
    chartData.push({
      data: finalExpensesChartData,
      label: EDataSource[EDataSource.Expenses],
    });
    chartData.push({
      data: finalIncomeChartData,
      label: EDataSource[EDataSource.Income],
    });
    chartData.push({
      data: finalWalletChartData,
      label: EDataSource[EDataSource.Wallet],
    });
    this.data = chartData;

    // set minimum date
    this.minDate = LineGraphUtils.computeMinimumDate(
      finalIncomeChartData,
      finalExpensesChartData
    );

    this.debug();
  }
  handleMaxDateChange() {
    this.render();
  }

  debugMaxDate() {
    console.log(this.maxDate);
  }

  debug() {
    console.log(this.incomeData);
    console.log(this.expensesData);
  }
}
