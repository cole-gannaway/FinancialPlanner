import { IRowData } from './IRowData';
import { v4 as uuidv4 } from 'uuid';

export class RowData implements IRowData {
  label: string;
  amount: number;
  frequency: string;
  date: Date;
  id: string;
  constructor() {
    this.label = '';
    this.amount = 0;
    this.frequency = 'Once';
    this.date = new Date();
    this.id = uuidv4();
  }
}
