import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemgraphWithQueryComponent } from '../memgraph-with-query/memgraph-with-query.component';
import { ManagraphService } from '../services/managraph.service';
import MemgraphInfo from '../types/memgraphInfo.type';

@Component({
  selector: 'app-memgraph',
  templateUrl: './memgraph.component.html',
  styleUrls: ['./memgraph.component.css']
})
export class MemgraphComponent {
  @Input()
  memgraphInfo: MemgraphInfo = {
    id: '',
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
  };
  @Input()
  isModalDialog: boolean = false;

  constructor(
    private managraphService: ManagraphService,
    public dialog: MatDialog
  ) { }

  public removeMemgraph(id: string) {
    this.managraphService.removeMemgraph(id).subscribe();
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

  public getMatCardQueryButtonClass = (isActive: boolean) =>
    `mat-card-button mat-card-button-query ${isActive ? 'connected' : ''}`;

  public openQueryDialog = () => {
    this.dialog.open(MemgraphWithQueryComponent, {
      data: { memgraphId: this.memgraphInfo.id }
    });
  }
}
