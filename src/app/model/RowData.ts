import { IRowData } from './IRowData';
export class RowData implements IRowData {
  label: string;
  amount: number;
  frequency: string;
  date: Date;
  constructor() {
    this.label = '';
    this.amount = 0;
    this.frequency = 'Once';
    this.date = new Date();
  }
}
