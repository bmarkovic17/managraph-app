import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import MemgraphInfo from '../types/memgraphInfo.type';

@Injectable({
  providedIn: 'root'
})
export class ManagraphService {
  constructor(private http: HttpClient) { }

  getMemGraphs = () =>
    this.http.get<MemgraphInfo[]>(`${environment.baseUrl}/managraph`);

  removeMemgraph = (id: string) =>
    this.http.delete(`${environment.baseUrl}/managraph/${id}`);
}
