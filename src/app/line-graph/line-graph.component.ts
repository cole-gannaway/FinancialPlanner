import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { EDataSource } from '../model/EDataSource';
import { ILineChartData } from '../model/ILineChartData';

import { EAggregateDateOption } from '../model/EAggregateDateOption';
import { IRowData } from '../model/IRowData';
import { DateUtils } from '../utils/date/date-utils';
import { LineGraphUtils } from '../utils/line-graph-utils/line-graph-utils';
import { DataTableService } from '../service/data-table-service/data-table.service';

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

  minDateInput: Date = new Date();
  maxDateInput: Date = new Date();

  minDateFromData: Date = new Date();
  maxDateFromData: Date = new Date();

  incomeLineChartData: ILineChartData[] = [];
  expensesLineChartData: ILineChartData[] = [];
  walletLineChartData: ILineChartData[] = [];

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

  constructor(dataTableService: DataTableService) {
    // subscribe to changes
    dataTableService.getChangeEventObservable().subscribe(() => {
      this.updateIncomeAndExpensesChartDataFromDataRows();
      this.updateWalletChartDataFromIncomeAndExpensesChartData();
      this.updateMaxAndMinDate(true);
      this.render();
    });
  }

  ngOnInit(): void {
    // push out one week
    this.maxDateInput.setDate(this.minDateInput.getDate() + 7);
    this.maxDateFromData.setDate(this.maxDateFromData.getDate() + 7);
  }

  updateIncomeAndExpensesChartDataFromDataRows() {
    // generate expenses data for chart
    const expensesChartData: ILineChartData[] = LineGraphUtils.generateChartDataFromRowDataArray(
      this.expensesData,
      this.maxDateInput
    );
    expensesChartData.forEach((value) => {
      value.y = value.y * -1;
    });
    // generate income data for chart
    const incomeChartData: ILineChartData[] = LineGraphUtils.generateChartDataFromRowDataArray(
      this.incomeData,
      this.maxDateInput
    );

    console.log('aggregating data');
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

    console.log('converting to maps to chartdata');
    // convert maps back to chartData
    const finalExpensesChartData = LineGraphUtils.convertMapToChartData(
      expensesChartMap
    );
    const finalIncomeChartData = LineGraphUtils.convertMapToChartData(
      incomeChartMap
    );

    console.log('sorting chartdata by date');
    // sort by date
    finalIncomeChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });
    finalExpensesChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });

    this.incomeLineChartData = finalIncomeChartData;
    this.expensesLineChartData = finalExpensesChartData;
  }
  updateWalletChartDataFromIncomeAndExpensesChartData() {
    console.log('building wallet map');
    // create walletMap
    const walletChartMap = new Map<string, number>();

    // aggregate all data
    const aggregateOption = EAggregateDateOption.DAY;
    const incomeChartMap = LineGraphUtils.aggregateChartDataBy(
      this.incomeLineChartData,
      aggregateOption
    );
    const expensesChartMap = LineGraphUtils.aggregateChartDataBy(
      this.expensesLineChartData,
      aggregateOption
    );

    incomeChartMap.forEach((value: number, key: string) => {
      LineGraphUtils.appendToMap(walletChartMap, key, value);
    });
    expensesChartMap.forEach((value: number, key: string) => {
      LineGraphUtils.appendToMap(walletChartMap, key, value);
    });

    console.log('building wallet chart data');
    // create walletChartData
    const walletChartData = LineGraphUtils.convertMapToChartData(
      walletChartMap
    );
    console.log('sorting wallet chart data');
    walletChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });
    const initialWalletValue = 0;
    console.log('generating wallet data from inital wallet value');
    const finalWalletChartData = LineGraphUtils.generateChartDataFromDeltas(
      initialWalletValue,
      walletChartData
    );
    this.walletLineChartData = finalWalletChartData;
  }
  updateMaxAndMinDate(updateMinAndMaxDate: boolean) {
    console.log('finding minimum and maximum dates');
    // find min and max income date
    let minIncomeDate: Date | null = null;
    let maxIncomeDate: Date | null = null;
    if (this.incomeLineChartData.length !== 0) {
      minIncomeDate = this.incomeLineChartData[0].x;
      maxIncomeDate = this.incomeLineChartData[
        this.incomeLineChartData.length - 1
      ].x;
    }

    // find min and max expenses date
    let minExpensesDate: Date | null = null;
    let maxExpensesDate: Date | null = null;
    if (this.expensesLineChartData.length !== 0) {
      minExpensesDate = this.expensesLineChartData[0].x;
      maxExpensesDate = this.expensesLineChartData[
        this.expensesLineChartData.length - 1
      ].x;
    }

    // compare dates
    const minDate = LineGraphUtils.getMinOrMaxDate(
      minIncomeDate,
      minExpensesDate,
      true
    );
    const maxDate = LineGraphUtils.getMinOrMaxDate(
      maxIncomeDate,
      maxExpensesDate,
      false
    );

    // set min and max dates from data
    if (minDate) {
      this.minDateFromData = minDate;
    }
    if (maxDate) {
      this.maxDateFromData = maxDate;
    }

    if (updateMinAndMaxDate) {
      // set minimum date
      this.minDateInput = DateUtils.cloneDate(this.minDateFromData);
      // set maximum date
      this.maxDateInput = DateUtils.cloneDate(this.maxDateFromData);
    }
  }
  render() {
    const isInRange = (data: ILineChartData) => {
      const minCompare = DateUtils.compareDates(this.minDateInput, data.x);
      const maxCompare = DateUtils.compareDates(this.maxDateInput, data.x);
      // after min and before
      if (minCompare <= 0 && maxCompare >= 0) {
        return true;
      } else {
        return false;
      }
    };

    // filter using the range comparator
    const finalIncomeChartData = this.incomeLineChartData.filter(isInRange);
    const finalExpensesChartData = this.expensesLineChartData.filter(isInRange);
    const finalWalletChartData = this.walletLineChartData.filter(isInRange);

    console.log('putting all chart data together');
    // combine chartData
    const chartData = [];
    chartData.push({
      data: finalIncomeChartData,
      label: EDataSource[EDataSource.Expenses],
    });
    chartData.push({
      data: finalExpensesChartData,
      label: EDataSource[EDataSource.Income],
    });
    chartData.push({
      data: finalWalletChartData,
      label: EDataSource[EDataSource.Wallet],
    });
    this.data = chartData;

    console.log('done');
  }

  handleMaxDateChange() {
    this.updateMaxAndMinDate(false);
    this.render();
  }
  handleMinDateChange() {
    this.updateMaxAndMinDate(false);
    this.render();
  }
}
