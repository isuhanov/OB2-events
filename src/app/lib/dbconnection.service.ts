import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, Worker } from '../domain';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type' : 'application/json',
}); 

let options = {
  headers: httpHeaders
}; 


@Injectable({
  providedIn: 'root'
})
export class DbconnectionService {
  constructor(private httpClient: HttpClient) { }

  public selectProjects(): Promise<readonly Project[]> {
    return firstValueFrom(this.httpClient.get<readonly Project[]>(`http://localhost:3001/projects`));
  }
  
  public selectWorkers(prId: number | undefined): Promise<readonly Worker[]> {
    let url = 'http://localhost:3001/workers';
    if (prId) { 
      url += `?pr_id=${prId}`;
    };    
    return firstValueFrom(this.httpClient.get<readonly Worker[]>(url));
  }

  public deleteWorker(workerId: number): Promise<Object> {
    return firstValueFrom(this.httpClient.delete(`http://localhost:3001/workers/delete?worker_id=${workerId}`));
  }

  public insertWorker(worker: Worker): Promise<Object> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/worker`, worker, options))    
  }
}
