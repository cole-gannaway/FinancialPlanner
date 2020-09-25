export class CSVUtils {
  public static parseCurrency(currency: string) {
    return Number(currency.replace(/[^0-9.-]+/g, ''));
  }
}
