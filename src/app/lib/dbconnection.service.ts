import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer, Project, Worker, WorkerProject } from '../domain';

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

// ----------------- PROJECTS ------------------------------

  public selectProjects(): Promise<readonly Project[]> {
    return firstValueFrom(this.httpClient.get<readonly Project[]>(`http://localhost:3001/projects`));
  }

  public selectProject(pId: number): Promise<readonly Project[]> {
    return firstValueFrom(this.httpClient.get<readonly Project[]>(`http://localhost:3001/project?project_id=${pId}`));
  }

  public insertProject(project: Project): Promise<any> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/project`, project, options)); 
  }

  public updatetProject(projectId: number, project: Project): Promise<any> {
    return firstValueFrom(this.httpClient.put(`http://localhost:3001/project?project_id=${projectId}`, project, options));  
  }

// ----------------- CUSTOMERS ------------------------------

  public selectCustomers(): Promise<readonly Customer[]> {
    return firstValueFrom(this.httpClient.get<readonly Customer[]>(`http://localhost:3001/customers`));
  }
  
  public selectCustomer(cId: number | undefined = undefined, customerName: string | undefined = undefined): Promise<readonly Customer[]> {
    let url = 'http://localhost:3001/customer?';
    if (cId) {
      url += `c_id=${cId}`;
    } else if (customerName) {
      url += `customer_name=${customerName}`;
    }
    return firstValueFrom(this.httpClient.get<readonly Customer[]>(url));
  }

  public insertCustomer(customer: Customer): Promise<any> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/worker`, customer, options)); 
  }


// ------------------ WORKERS --------------------------------
  
  public selectWorkers(prId: number | undefined): Promise<readonly Worker[]> {
    let url = 'http://localhost:3001/workers';
    if (prId) { 
      url += `?pr_id=${prId}`;
    };    
    return firstValueFrom(this.httpClient.get<readonly Worker[]>(url));
  }

  public selectWorker(wId: number): Promise<readonly Worker[]> {
    return firstValueFrom(this.httpClient.get<readonly Worker[]>(`http://localhost:3001/worker?w_id=${wId}`));
  }

  public deleteWorker(workerId: number): Promise<any> {
    return firstValueFrom(this.httpClient.delete(`http://localhost:3001/worker?worker_id=${workerId}`));
  }

  public insertWorker(worker: Worker): Promise<any> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/worker`, worker, options)); 
  }

  public updatetWorker(workerId: number, worker: Worker): Promise<any> {
    return firstValueFrom(this.httpClient.put(`http://localhost:3001/worker?worker_id=${workerId}`, worker, options));  
  }


// ------------------ WORKERS-PROJECTS --------------------------------

public insertWorkerProject(workerProject: WorkerProject): Promise<any> {
  return firstValueFrom(this.httpClient.post(`http://localhost:3001/worker-project`, workerProject, options)); 
}

}
