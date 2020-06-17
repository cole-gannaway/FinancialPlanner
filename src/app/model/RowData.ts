import { IRowData } from './IRowData';
import { v4 as uuidv4 } from 'uuid';
import { EFrequency } from './EFrequency';
import { EnumUtils } from '../utils/enum/EnumUtils';

export class RowData implements IRowData {
  private label: string;
  private amount: number;
  private frequency: string;
  private date: Date;
  private id: string;

  constructor() {
    this.label = '';
    this.amount = 0;
    this.frequency = 'Once';
    this.date = new Date();
    this.id = uuidv4();
  }

  public static createRowData(amount: number, frequency: string, date: Date) {
    const created = new RowData();
    created.setAmount(amount);
    created.setFrequency(frequency);
    created.setDate(date);
    return created;
  }

  public getLabel(): string {
    return this.label;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }
  public getFrequency(): string {
    return this.frequency;
  }

  public getFrequencyAsEnum(): EFrequency {
    return EnumUtils.convertStringToEFrequency(this.frequency);
  }

  public setFrequency(frequency: string): void {
    this.frequency = frequency;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }
}
