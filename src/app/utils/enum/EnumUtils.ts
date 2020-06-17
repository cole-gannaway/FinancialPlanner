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
}
