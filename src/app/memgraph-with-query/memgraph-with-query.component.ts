import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ManagraphService } from '../services/managraph.service';
import MemgraphInfo from '../types/memgraphInfo.type';

@Component({
  selector: 'app-memgraph-with-query',
  templateUrl: './memgraph-with-query.component.html',
  styleUrls: ['./memgraph-with-query.component.css']
})
export class MemgraphWithQueryComponent implements OnInit, OnDestroy {
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
  memgraphInfoSource = timer(0, 1000).pipe(
    mergeMap(_ => this.managraphService.getMemGraph(this.data.memgraphId)));
  sourceSubscription: Subscription = new Subscription();
  result: string = '';

  constructor(
    public dialogRef: MatDialogRef<MemgraphWithQueryComponent>,
    private managraphService: ManagraphService,
    @Inject(MAT_DIALOG_DATA) public data: { memgraphId: string }
  ) { }

  ngOnInit(): void {
    this.sourceSubscription = this.memgraphInfoSource.subscribe({
      next: memgraphInfo => {
        this.memgraphInfo = memgraphInfo;
        this.query = memgraphInfo.active ? this.query : '';
      }
    });
  }

  ngOnDestroy(): void {
    this.sourceSubscription.unsubscribe();
  }

  public runCypherQuery = () =>
    this.managraphService.runCypherQuery(this.memgraphInfo.id, this.query)
      .subscribe(result => this.result = JSON.stringify(result, undefined, 4));

  public cancelRunQuery = () =>
    this.dialogRef.close();
}
