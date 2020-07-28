import { IRowData } from './IRowData';
import { DateUtils } from '../utils/date/date-utils';

export class CompareUtils {
  public static getComparator(
    columnName: string
  ): (a: IRowData, b: IRowData) => number {
    switch (columnName) {
      case 'label':
        return (a: IRowData, b: IRowData) => {
          return a.getLabel().localeCompare(b.getLabel());
        };
      case 'date':
        return (a: IRowData, b: IRowData) => {
          return DateUtils.compareDates(a.getDate(), b.getDate());
        };
      case 'amount':
        return (a: IRowData, b: IRowData) => {
          return a.getAmount() - b.getAmount();
        };
      case 'frequency':
        return (a: IRowData, b: IRowData) => {
          return a
            .getFrequencyAsEnum()
            .toString()
            .localeCompare(b.getFrequencyAsEnum().toString());
        };
      default:
        return (a: IRowData, b: IRowData) => {
          return 0;
        };
    }
  }
}
