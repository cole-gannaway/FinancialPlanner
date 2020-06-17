import { EFrequency } from './EFrequency';

export interface IRowData {
  getLabel(): string;

  setLabel(label: string): void;

  getAmount(): number;

  setAmount(amount: number): void;

  getFrequency(): string;

  getFrequencyAsEnum(): EFrequency;

  setFrequency(frequency: string): void;

  getDate(): Date;

  setDate(date: Date): void;

  getId(): string;

  setId(id: string): void;
}
