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

  getMemGraph = (id: string) =>
    this.http.get<MemgraphInfo>(`${environment.baseUrl}/managraph/${id}`);

  removeMemgraph = (id: string) =>
    this.http.delete(`${environment.baseUrl}/managraph/${id}`);

  addMemgraph = (name: string, uri: string) =>
    this.http.post(`${environment.baseUrl}/managraph`, { name: name, uri: uri });

  runCypherQuery = (id: string, query: string) =>
    this.http.post(`${environment.baseUrl}/managraph/${id}`, { query: query });
}
