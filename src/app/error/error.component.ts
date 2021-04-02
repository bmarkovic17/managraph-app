import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ErrorComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { errorMessage: string }
  ) { }

  public closeErrorSheet = () =>
    this.bottomSheetRef.dismiss();
}
