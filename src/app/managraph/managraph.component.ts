import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ManagraphService } from '../services/managraph.service';
import Card from '../types/card.type';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-managraph',
  templateUrl: './managraph.component.html',
  styleUrls: ['./managraph.component.css']
})
export class ManagraphComponent implements OnInit {
  cards: Card[] = [];
  memgraphs = interval(1000).pipe(
    mergeMap(_ => this.managraphService.getMemGraphs()));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private managraphService: ManagraphService) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large])
      .subscribe({
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

  public getLabelForStorageTypeKey(key: string) {
    switch (key) {
      case 'vertexCount':
        return 'Vertex count';
      case 'edgeCount':
        return 'Edge count';
      case 'averageDegree':
        return 'Average degree';
      case 'memoryUsage':
        return 'Memory usage';
      case 'diskUsage':
        return 'Disk usage';
      default:
        return '';
    }
  }

  public getValueWithMeasurementUnit(key: string, value: number | null) {
    switch (key) {
      case 'memoryUsage':
      case 'diskUsage':
        return `${value
          ? Math.round(value / 1024 / 1024).toString().concat(' MB')
          : ''}`;
      default:
        return value;
    }
  }
}
