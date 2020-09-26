import { EAggregateDateOption } from 'src/app/model/EAggregateDateOption';
import { EFrequency } from 'src/app/model/EFrequency';

export class DateUtils {
  public static createDateFromKey(
    key: string,
    aggregrateOption: EAggregateDateOption
  ): Date {
    let retVal = null;
    switch (aggregrateOption) {
      case EAggregateDateOption.YEAR:
        const createdDate = new Date('1-1-1970');
        // tslint:disable-next-line: radix
        const year = Number.parseInt(key);
        createdDate.setFullYear(year);
        retVal = createdDate;
        break;
      case EAggregateDateOption.MONTH:
        retVal = new Date(key);
        break;
      case EAggregateDateOption.DAY:
        retVal = new Date(key);
        break;
    }
    return retVal;
  }

  public static createKeyByAggregateOption(
    d: Date,
    aggregateOption: EAggregateDateOption
  ) {
    switch (aggregateOption) {
      case EAggregateDateOption.YEAR:
        return '' + d.getFullYear();
      case EAggregateDateOption.MONTH:
        return (
          '' + d.getFullYear() + '/' + this.getMonthInMMFormat(d.getMonth())
        );
      case EAggregateDateOption.DAY:
        return (
          '' +
          d.getFullYear() +
          '/' +
          this.getMonthInMMFormat(d.getMonth()) +
          '/' +
          d.getDate()
        );
    }
  }
  private static getMonthInMMFormat(month: number) {
    const actualMonth = month + 1;
    if (actualMonth < 10) {
      return '0' + actualMonth;
    } else {
      return '' + actualMonth;
    }
  }
  public static compareDates(a: Date, b: Date) {
    let compare = a.getFullYear() - b.getFullYear();
    if (compare === 0) {
      compare = a.getMonth() - b.getMonth();
    }
    if (compare === 0) {
      compare = a.getDate() - b.getDate();
    }
    return compare;
  }
  public static cloneDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  public static generateNextDate(date: Date, frequency: EFrequency) {
    let createdDate = this.cloneDate(date);
    switch (frequency) {
      case EFrequency.DAILY:
        createdDate.setDate(createdDate.getDate() + 1);
        break;
      case EFrequency.WEEKLY:
        createdDate.setDate(createdDate.getDate() + 7);
        break;
      case EFrequency.MONTHLY:
        createdDate.setMonth(createdDate.getMonth() + 1);
        break;
      case EFrequency.ANNUAL:
        createdDate.setFullYear(createdDate.getFullYear() + 1);
        break;
      case EFrequency.ONCE:
      case EFrequency.UNKNOWN:
        createdDate = null;
        break;
    }
    return createdDate;
  }

  public static isInRange(
    testVal: Date,
    minDate: Date,
    maxDate: Date
  ): boolean {
    const minCompare = DateUtils.compareDates(minDate, testVal);
    const maxCompare = DateUtils.compareDates(maxDate, testVal);
    // after min and before
    if (minCompare <= 0 && maxCompare >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
