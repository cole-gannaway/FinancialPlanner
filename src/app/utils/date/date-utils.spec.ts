import { DateUtils } from './date-utils';
import { EFrequency } from 'src/app/model/EFrequency';
import { EAggregateDateOption } from 'src/app/model/EAggregateDateOption';

describe('DateUtils', () => {
  it('should create an instance', () => {
    expect(new DateUtils()).toBeTruthy();
  });

  it('should clone the date', () => {
    const date = new Date(1970, 1, 1);
    const clonedDate = DateUtils.cloneDate(date);
    expect(date).toEqual(clonedDate);
  });

  it('should generate the next date', () => {
    const date = new Date(1970, 1, 1);

    // Day
    const nextDay = DateUtils.generateNextDate(date, EFrequency.DAILY);
    const expectedNextDay = new Date(1970, 1, 2);
    expect(expectedNextDay).toEqual(nextDay);

    // Week
    const nextWeek = DateUtils.generateNextDate(date, EFrequency.WEEKLY);
    const expectedNextWeek = new Date(1970, 1, 8);
    expect(expectedNextWeek).toEqual(nextWeek);

    // Month
    const nextMonth = DateUtils.generateNextDate(date, EFrequency.MONTHLY);
    const expectedNextMonth = new Date(1970, 2, 1);
    expect(expectedNextMonth).toEqual(nextMonth);

    // Year
    const nextYear = DateUtils.generateNextDate(date, EFrequency.ANNUAL);
    const expectedNextYear = new Date(1971, 1, 1);
    expect(expectedNextYear).toEqual(nextYear);

    // Once
    const nextOnce = DateUtils.generateNextDate(date, EFrequency.ONCE);
    const expectedNextOnce = null;
    expect(expectedNextOnce).toEqual(nextOnce);

    // Unknown
    const nextUnknown = DateUtils.generateNextDate(date, EFrequency.UNKNOWN);
    const expectedNextUnknown = null;
    expect(expectedNextUnknown).toEqual(nextUnknown);
  });

  it('should compare the dates by year, month, and day', () => {
    // Equals
    const date = new Date(1970, 1 - 1, 1);
    const sameDate = new Date(1970, 1 - 1, 1);
    expect(DateUtils.compareDates(date, sameDate)).toEqual(0);

    // Year
    const diffYear = new Date(1971, 1 - 1, 1);
    expect(DateUtils.compareDates(date, diffYear)).toEqual(-1);

    // Month
    const diffMonth = new Date(1970, 3 - 1, 1);
    expect(DateUtils.compareDates(date, diffMonth)).toEqual(-2);

    // Day
    const diffDay = new Date(1970, 1 - 1, 4);
    expect(DateUtils.compareDates(date, diffDay)).toEqual(-3);
  });
  it('should stringify the date by the aggregate option', () => {
    const date = new Date(1970, 1 - 1, 1);

    // Year
    const keyYear = DateUtils.createKeyByAggregateOption(
      date,
      EAggregateDateOption.YEAR
    );
    expect(keyYear).toEqual('1970');

    // Month
    const keyMonth = DateUtils.createKeyByAggregateOption(
      date,
      EAggregateDateOption.MONTH
    );
    expect(keyMonth).toEqual('1970/01');

    // Day
    const keyDay = DateUtils.createKeyByAggregateOption(
      date,
      EAggregateDateOption.DAY
    );
    expect(keyDay).toEqual('1970/01/1');
  });
});
