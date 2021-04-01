import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ManagraphService } from '../services/managraph.service';
import MemgraphInfo from '../types/memgraphInfo.type';

@Component({
  selector: 'app-memgraph-with-query',
  templateUrl: './memgraph-with-query.component.html',
  styleUrls: ['./memgraph-with-query.component.css']
})
export class MemgraphWithQueryComponent implements OnInit {
  query: string = '';
  memgraphInfo: MemgraphInfo = {
    id: this.data.memgraphId,
    name: '',
    uri: '',
    active: false,
    storageInfo: {
      vertexCount: null,
      edgeCount: null,
      averageDegree: null,
      diskUsage: null,
      memoryUsage: null
    }
  }
  memgraphInfoSource = timer(0, 3000).pipe(
    mergeMap(_ => this.managraphService.getMemGraph(this.data.memgraphId)));
  result: string = '';

  constructor(
    public dialogRef: MatDialogRef<MemgraphWithQueryComponent>,
    private managraphService: ManagraphService,
    @Inject(MAT_DIALOG_DATA) public data: { memgraphId: string }) { }

    ngOnInit(): void {
      this.memgraphInfoSource.subscribe({
        next: memgraphInfo => {
          this.memgraphInfo = memgraphInfo;
          this.query = memgraphInfo.active ? this.query : '';
        }
      });
    }

  public runCypherQuery = () =>
    this.managraphService.runCypherQuery(this.memgraphInfo.id, this.query)
      .subscribe(result => this.result = JSON.stringify(result, undefined, 4));

  public cancelRunQuery = () =>
    this.dialogRef.close();
}
