import { IRowData } from 'src/app/model/IRowData';
import { ILineChartData } from 'src/app/model/ILineChartData';
import { EFrequency } from 'src/app/model/EFrequency';
import { DateUtils } from '../date/date-utils';
import { EAggregateDateOption } from 'src/app/model/EAggregateDateOption';

export class LineGraphUtils {
  public static computeMinimumDate(
    incomeChartData: ILineChartData[],
    expensesChartData: ILineChartData[]
  ): Date {
    let minDate = null;
    if (incomeChartData.length !== 0) {
      const minIncomeDate = DateUtils.cloneDate(incomeChartData[0].x);
      minDate = minIncomeDate;
    }
    if (expensesChartData.length !== 0) {
      const minExpensesDate = DateUtils.cloneDate(expensesChartData[0].x);
      if (minDate != null) {
        const compare = DateUtils.compareDates(minDate, minExpensesDate);
        // expenses min date is < income min date
        if (compare > 1) {
          minDate = minExpensesDate;
        }
      } else {
        // nothing to compare to
        minDate = minExpensesDate;
      }
    }
    return minDate;
  }
  /**
   *
   * @param rowDataArr  value
   * @param endDate inclusive
   * @returns line chart data up to the end date
   */
  public static generateChartDataFromRowDataArray(
    rowDataArr: Array<IRowData>,
    endDate: Date
  ) {
    const data: ILineChartData[] = [];
    rowDataArr.forEach((row) => {
      const generatedData = this.generateChartDataFromRowData(
        row.getAmount(),
        row.getFrequencyAsEnum(),
        row.getDate(),
        endDate
      );
      generatedData.forEach((generated) => {
        data.push({
          x: generated.x,
          y: generated.y,
        });
      });
    });
    return data;
  }

  /**
   *
   * @param amount value
   * @param frequency recurring frequency
   * @param startDate inclusive
   * @param endDate inclusive
   * @returns an array of the value repeated by the given frequency from the start to end date
   */
  public static generateChartDataFromRowData(
    amount: number,
    frequency: EFrequency,
    startDate: Date,
    endDate: Date
  ) {
    const data: ILineChartData[] = [];

    // clone startDate
    let currDate = DateUtils.cloneDate(startDate);

    // do not iterate if once or unknown
    const shouldIterate = !(
      frequency === EFrequency.ONCE || frequency === EFrequency.UNKNOWN
    );
    do {
      data.push({
        x: currDate,
        y: amount,
      });
      // iterate
      currDate = DateUtils.generateNextDate(currDate, frequency);
    } while (
      shouldIterate &&
      // compare inclusively
      DateUtils.compareDates(currDate, endDate) <= 0
    );
    {
    }

    return data;
  }

  /**
   *
   * @param intialValue  initial value for the wallet to begin at
   * @param delataData tells how the values changed from date to date
   * @returns line chart data that applies the deltaData to an intial value
   */
  public static generateChartDataFromDeltas(
    intialValue: number,
    delataData: ILineChartData[]
  ) {
    const data: ILineChartData[] = [];
    let currentWallet = intialValue;
    delataData.forEach((chartData) => {
      currentWallet += chartData.y;
      data.push({
        x: DateUtils.cloneDate(chartData.x),
        y: currentWallet,
      });
    });
    return data;
  }
  /**
   *
   * @param data  data
   * @param aggregateBy specifies the interval
   * @returns map of aggregated data
   */
  public static aggregateChartDataBy(
    data: Array<ILineChartData>,
    aggregateBy: EAggregateDateOption
  ) {
    const walletMap = new Map<string, number>();
    data.forEach((rowData) => {
      const rowKey = DateUtils.createKeyByAggregateOption(
        rowData.x,
        aggregateBy
      );
      const rowValue = rowData.y;
      this.appendToMap(walletMap, rowKey, rowValue);
    });
    return walletMap;
  }
  /**
   * Helper function used to put data in the map
   * @param map  map
   * @param key key
   * @param value value
   * @returns void
   */
  public static appendToMap(
    map: Map<string, number>,
    key: string,
    value: number
  ) {
    // look up exisiting value
    const existingValue = map.get(key);
    // if value exists aggregate it
    if (existingValue) {
      // aggregate by
      const newValue = existingValue + value;
      map.set(key, newValue);
    }
    // new value
    else {
      map.set(key, value);
    }
  }
  /**
   * Converts map to chart data
   * @param map  map
   * @returns chart data
   */
  public static convertMapToChartData(map: Map<string, number>) {
    const data: ILineChartData[] = [];
    map.forEach((value: number, key: string) => {
      data.push({
        x: new Date(key),
        y: value,
      });
    });
    return data;
  }
}
