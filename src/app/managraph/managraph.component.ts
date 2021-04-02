import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ManagraphService } from '../services/managraph.service';
import Card from '../types/card.type';
import { timer } from 'rxjs';
import { mergeMap, retryWhen, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddNewInstanceDialogComponent } from '../add-new-instance-dialog/add-new-instance-dialog.component';
import MemgraphInfo from '../types/memgraphInfo.type';

@Component({
  selector: 'app-managraph',
  templateUrl: './managraph.component.html',
  styleUrls: ['./managraph.component.css']
})
export class ManagraphComponent implements OnInit {
  lastUpdated: string = ' - updated: never';
  filter: string = '';

  memgraphsInfo: MemgraphInfo[] = [];
  cards: Card[] = [];

  memgraphs = timer(0, 3000).pipe(
    mergeMap(_ => this.managraphService.getMemGraphs()),
    retryWhen(errors => errors.pipe(delay(5000))));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private managraphService: ManagraphService,
    public dialog: MatDialog
  ) { }

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
        this.lastUpdated = ' - updated: '.concat(new Date().toUTCString());
        this.memgraphsInfo = memgraphsInfo;

        this.fillCards(this.filter);
      }
    });
  };

  public openNewInstanceDialog = () =>
    this.dialog.open(AddNewInstanceDialogComponent);

  public filterChanged = (filter: string | null) =>
    this.fillCards(filter);

  private getCols = () => {
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

  private fillCards = (filter: string | null) => {
    this.cards.length = 0;

    this.memgraphsInfo
      .filter(memgraphInfo => filter ? memgraphInfo.name.includes(filter) || memgraphInfo.uri.includes(filter) : true)
      .forEach(memgraphInfo => this.cards.push({ memgraphInfo: memgraphInfo, cols: this.getCols(), rows: 1 }));
  }
}
