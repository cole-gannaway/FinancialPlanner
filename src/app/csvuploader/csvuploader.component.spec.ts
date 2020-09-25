import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSVUploaderComponent } from './csvuploader.component';

describe('CSVUploaderComponent', () => {
  let component: CSVUploaderComponent;
  let fixture: ComponentFixture<CSVUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSVUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSVUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
