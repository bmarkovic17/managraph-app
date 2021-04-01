import { Component, Input, OnInit } from '@angular/core';
import { ManagraphService } from '../services/managraph.service';
import Card from '../types/card.type';

@Component({
  selector: 'app-memgraph',
  templateUrl: './memgraph.component.html',
  styleUrls: ['./memgraph.component.css']
})
export class MemgraphComponent implements OnInit {
  @Input()
  card: Card;

  constructor(private managraphService: ManagraphService) {
    this.card = {
      cols: 1,
      rows: 1,
      memgraphInfo: {
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
      }
    }
  }

  ngOnInit(): void {
  }

  public removeMemgraph (id: string) {
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
    `mat-card-button mat-card-button-query ${isActive ? 'connected' : ''}`
}
