import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ManagraphService } from '../services/managraph.service';
import NewInstance from '../types/newInstance.type';

@Component({
  selector: 'app-add-new-instance-dialog',
  templateUrl: './add-new-instance-dialog.component.html',
  styleUrls: ['./add-new-instance-dialog.component.css']
})
export class AddNewInstanceDialogComponent {
  public newInstance: NewInstance = { name: '', uri: '' };

  constructor(
    public dialogRef: MatDialogRef<AddNewInstanceDialogComponent>,
    private managraphService: ManagraphService
  ) { }

  public addNewInstance = () => {
    this.managraphService.addMemgraph(this.newInstance.name, this.newInstance.uri)
      .subscribe(_ => this.dialogRef.close());
  }

  public cancelNewInstance = () =>
    this.dialogRef.close();
}
