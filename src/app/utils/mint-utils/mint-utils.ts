import { RowData } from 'src/app/model/RowData';
import { LineGraphUtils } from '../line-graph-utils/line-graph-utils';

export class MintUtils {
  static payCheckStr = 'Paycheck';
  static incomeStr = 'Income';
  static creditCardPaymentStr = 'Credit Card Payment';
  static transferStr = 'Transfer';
  static duplicateStr = 'Duplicate';

  static createRowData(row: string[]): RowData {
    const label = row[2];
    const date = new Date(row[0]);
    const amount = parseFloat(row[3]);
    const category = row[5];
    const frequency = 'Once';
    const rowData: RowData = RowData.createRowData(
      amount,
      frequency,
      date,
      category
    );
    rowData.setLabel(label);
    return rowData;
  }
  static isIncome(categoryStr: string) {
    let retVal = false;
    if (categoryStr === MintUtils.payCheckStr) {
      retVal = true;
    } else if (categoryStr === MintUtils.incomeStr) {
      retVal = true;
    }
    return retVal;
  }
  static isAlwaysExcluded(categoryStr: string) {
    let retVal = false;
    if (categoryStr === MintUtils.transferStr) {
      retVal = true;
    } else if (categoryStr === MintUtils.creditCardPaymentStr) {
      retVal = true;
    } else if (categoryStr === MintUtils.duplicateStr) {
      retVal = true;
    }
    return retVal;
  }
}
