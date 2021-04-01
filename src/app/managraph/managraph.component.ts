import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ManagraphService } from '../services/managraph.service';
import Card from '../types/card.type';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddNewInstanceDialogComponent } from '../add-new-instance-dialog/add-new-instance-dialog.component';

@Component({
  selector: 'app-managraph',
  templateUrl: './managraph.component.html',
  styleUrls: ['./managraph.component.css']
})
export class ManagraphComponent implements OnInit {
  cards: Card[] = [];
  memgraphs = timer(0, 1000).pipe(
    mergeMap(_ => this.managraphService.getMemGraphs()));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private managraphService: ManagraphService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe({
      next: () => this.cards.forEach(card => card.cols = this.getCols())
    });

    this.memgraphs.subscribe({
      next: memgraphsInfo => {
        this.cards.length = 0;

        memgraphsInfo.forEach(memgraphInfo =>
          this.cards.push({ memgraphInfo: memgraphInfo, cols: this.getCols(), rows: 1 }));
      }
    });
  }

  public openNewInstanceDialog() {
    const _ = this.dialog.open(AddNewInstanceDialogComponent);
  }

  private getCols() {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      return 4;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      return 2;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      return 2;
    } else {
      return 1;
    }
  }
}
