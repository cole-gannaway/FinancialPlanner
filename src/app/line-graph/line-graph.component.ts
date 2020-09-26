import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { EDataSource } from '../model/EDataSource';
import { ILineChartData } from '../model/ILineChartData';

import { EAggregateDateOption } from '../model/EAggregateDateOption';
import { IRowData } from '../model/IRowData';
import { DateUtils } from '../utils/date/date-utils';
import { LineGraphUtils } from '../utils/line-graph-utils/line-graph-utils';
import { DataTableService } from '../service/data-table-service/data-table.service';
import { EnumUtils } from '../utils/enum/EnumUtils';

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

  initialWalletAmount = 0;
  aggregateOptionStr = 'Day';
  aggregateOption: EAggregateDateOption = EAggregateDateOption.DAY;
  minDateInput: Date = new Date();
  maxDateInput: Date = new Date();
  prevMaxDateInput: Date = null;

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
      this.setIncomeAndExpensesChartDataFromDataRows(
        this.maxDateInput,
        this.aggregateOption
      );
      this.setMaxAndMinDateFromLineChartData();
      this.copyMinAndMaxDatesFromDataToMinAndMaxInputs();
      this.filterAndRenderLineChartDatas();
    });
  }

  ngOnInit(): void {
    // push out one week
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() + 7);

    this.maxDateInput = DateUtils.cloneDate(createdDate);
    this.maxDateFromData = DateUtils.cloneDate(createdDate);
  }

  copyMinAndMaxDatesFromDataToMinAndMaxInputs() {
    this.minDateInput = DateUtils.cloneDate(this.minDateFromData);
    this.maxDateInput = DateUtils.cloneDate(this.maxDateFromData);
  }

  setIncomeAndExpensesChartDataFromDataRows(
    endDate: Date,
    aggregateOption: EAggregateDateOption
  ) {
    // generate expenses data for chart up to end date
    const expensesChartData: ILineChartData[] = LineGraphUtils.generateChartDataFromRowDataArray(
      this.expensesData,
      endDate
    );

    // make expenses data negative
    expensesChartData.forEach((value) => {
      value.y = value.y * -1;
    });

    // generate income data for chart up to end date
    const incomeChartData: ILineChartData[] = LineGraphUtils.generateChartDataFromRowDataArray(
      this.incomeData,
      endDate
    );

    // aggregate income and expenses data using maps
    const incomeChartMap = LineGraphUtils.aggregateChartDataBy(
      incomeChartData,
      aggregateOption
    );
    const expensesChartMap = LineGraphUtils.aggregateChartDataBy(
      expensesChartData,
      aggregateOption
    );

    // convert aggregated maps back to chartData
    const aggregatedExpensesChartData = LineGraphUtils.convertMapToChartData(
      expensesChartMap,
      aggregateOption
    );
    const aggregatedIncomeChartData = LineGraphUtils.convertMapToChartData(
      incomeChartMap,
      aggregateOption
    );

    // sort aggregated by date
    aggregatedIncomeChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });
    aggregatedExpensesChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });

    // save results
    this.incomeLineChartData = aggregatedIncomeChartData;
    this.expensesLineChartData = aggregatedExpensesChartData;
  }

  setWalletChartDataFromIncomeAndExpensesChartData(
    filteredIncomeChartData: ILineChartData[],
    filteredExpensesChartData: ILineChartData[],
    aggregateOption: EAggregateDateOption,
    initialWalletValue: number
  ) {
    // aggregate income and expense data
    const incomeChartMap = LineGraphUtils.aggregateChartDataBy(
      filteredIncomeChartData,
      aggregateOption
    );
    const expensesChartMap = LineGraphUtils.aggregateChartDataBy(
      filteredExpensesChartData,
      aggregateOption
    );

    // compute wallet deltas by aggregates
    const walletDeltaMap = new Map<string, number>();
    incomeChartMap.forEach((value: number, key: string) => {
      LineGraphUtils.appendToMap(walletDeltaMap, key, value);
    });
    expensesChartMap.forEach((value: number, key: string) => {
      LineGraphUtils.appendToMap(walletDeltaMap, key, value);
    });

    // convert aggregate deltas map to chart data
    const walletDeltaChartData = LineGraphUtils.convertMapToChartData(
      walletDeltaMap,
      aggregateOption
    );

    // sort delta chart data by date
    walletDeltaChartData.sort((a: ILineChartData, b: ILineChartData) => {
      return DateUtils.compareDates(a.x, b.x);
    });

    // apply inital wallet to deltas
    const finalWalletDeltaChartData = LineGraphUtils.generateChartDataFromDeltas(
      initialWalletValue,
      walletDeltaChartData
    );

    this.walletLineChartData = finalWalletDeltaChartData;
  }
  setMaxAndMinDateFromLineChartData() {
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
  }
  filterAndRenderLineChartDatas() {
    const filteredIncomeLineChartData = LineGraphUtils.filterLineChartData(
      this.incomeLineChartData,
      this.minDateInput,
      this.maxDateInput
    );
    const filteredExpensesLineChartData = LineGraphUtils.filterLineChartData(
      this.expensesLineChartData,
      this.minDateInput,
      this.maxDateInput
    );
    this.setWalletChartDataFromIncomeAndExpensesChartData(
      filteredIncomeLineChartData,
      filteredExpensesLineChartData,
      this.aggregateOption,
      this.initialWalletAmount
    );
    this.renderChartData(
      filteredIncomeLineChartData,
      filteredExpensesLineChartData,
      this.walletLineChartData
    );
  }
  renderChartData(
    incomeLineChartData: ILineChartData[],
    expensesLineChartData: ILineChartData[],
    walletLineChartData: ILineChartData[]
  ) {
    const chartData = [];
    chartData.push({
      data: expensesLineChartData,
      label: EDataSource[EDataSource.Expenses],
    });
    chartData.push({
      data: incomeLineChartData,
      label: EDataSource[EDataSource.Income],
    });
    chartData.push({
      data: walletLineChartData,
      label: EDataSource[EDataSource.Wallet],
    });
    this.data = chartData;
  }

  handleMaxDateChange() {
    let compare = 1;
    if (this.prevMaxDateInput != null) {
      compare = DateUtils.compareDates(
        this.maxDateInput,
        this.prevMaxDateInput
      );
    }
    // max date increased causes recalculation
    if (compare > 0) {
      this.setIncomeAndExpensesChartDataFromDataRows(
        this.maxDateInput,
        this.aggregateOption
      );
      this.setMaxAndMinDateFromLineChartData();
      // skip copyMinAndMaxDatesFromDataToMinAndMaxInputs
    }
    this.filterAndRenderLineChartDatas();

    // update previous
    this.prevMaxDateInput = DateUtils.cloneDate(this.maxDateInput);
  }
  handleMinDateChange() {
    this.filterAndRenderLineChartDatas();
  }
  handleAggregateOptionChange() {
    // convert new value
    const newAggregateOption = EnumUtils.convertStringToEAggregateDateOption(
      this.aggregateOptionStr
    );

    // set new value
    this.aggregateOption = newAggregateOption;

    // re-calculate data using new aggregate option
    this.setIncomeAndExpensesChartDataFromDataRows(
      this.maxDateInput,
      this.aggregateOption
    );
    this.setMaxAndMinDateFromLineChartData();
    this.copyMinAndMaxDatesFromDataToMinAndMaxInputs();
    this.filterAndRenderLineChartDatas();
  }
}
