import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project, Worker } from '../domain';



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
    
    console.log(url);
    return firstValueFrom(this.httpClient.get<readonly Worker[]>(url));
  }
}
