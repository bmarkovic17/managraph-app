import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInstanceDialogComponent } from './add-new-instance-dialog.component';

describe('AddNewInstanceDialogComponent', () => {
  let component: AddNewInstanceDialogComponent;
  let fixture: ComponentFixture<AddNewInstanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewInstanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
