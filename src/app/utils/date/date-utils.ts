import { EAggregateDateOption } from 'src/app/model/EAggregateDateOption';
import { EFrequency } from 'src/app/model/EFrequency';

export class DateUtils {
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
}
