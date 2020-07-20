import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  private changeEventSource: Subject<string>;
  public changeEventObservable: Observable<string>;
  constructor() {
    this.changeEventSource = new Subject<string>();
    this.changeEventObservable = this.changeEventSource.asObservable();
  }
  public getChangeEventObservable() {
    return this.changeEventObservable;
  }
  public changeEvent(message: any) {
    this.changeEventSource.next(message);
  }
}
