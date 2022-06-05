import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../domain';



@Injectable({
  providedIn: 'root'
})
export class DbconnectionService {
  constructor(private httpClient: HttpClient) { }

  public selectProjects(): Promise<readonly Project[]> {
    return firstValueFrom(this.httpClient.get<readonly Project[]>(`http://localhost:3001/projects`));
  }
  
  public selectUsers(): Promise<Project> {
    return firstValueFrom(this.httpClient.get<Project>(`http://localhost:3001/users`));
  }
}
