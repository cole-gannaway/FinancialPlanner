import { EAggregateDateOption } from 'src/app/model/EAggregateDateOption';
import { EFrequency } from '../../model/EFrequency';

export class EnumUtils {
  public static convertStringToEFrequency(value: string): EFrequency {
    switch (value) {
      case 'Annual':
        return EFrequency.ANNUAL;
      case 'Daily':
        return EFrequency.DAILY;
      case 'Once':
        return EFrequency.ONCE;
      case 'Monthly':
        return EFrequency.MONTHLY;
      case 'Weekly':
        return EFrequency.WEEKLY;
      default:
        return EFrequency.UNKNOWN;
    }
  }

  public static convertStringToEAggregateDateOption(
    value: string
  ): EAggregateDateOption {
    switch (value) {
      case 'Year':
        return EAggregateDateOption.YEAR;
      case 'Month':
        return EAggregateDateOption.MONTH;
      case 'Day':
        return EAggregateDateOption.DAY;
    }
  }
}
