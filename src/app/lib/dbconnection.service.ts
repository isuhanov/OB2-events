import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer, Events, Project, Worker, WorkerEvent, WorkerProject } from '../domain';

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


// ----------------- EVENTS ------------------------------

  public selectEvents(): Promise<readonly Events[]> {
    return firstValueFrom(this.httpClient.get<readonly Events[]>(`http://localhost:3001/events`));
  }

  public selectEvent(eventId: number): Promise<readonly Events[]> {
    return firstValueFrom(this.httpClient.get<readonly Events[]>(`http://localhost:3001/event?event_id=${eventId}`));
  }

  public deleteEvent(eventId: number): Promise<any> {
    return firstValueFrom(this.httpClient.delete(`http://localhost:3001/event?event_id=${eventId}`));
  }

  public insertEvent(event: Events): Promise<any> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/event`, event, options)); 
  }

  public updatetEvent(eventId: number, event: Events): Promise<any> {
    return firstValueFrom(this.httpClient.put(`http://localhost:3001/event?event_id=${eventId}`, event, options));  
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

  public deleteCustomer(customerId: number): Promise<any> {
    return firstValueFrom(this.httpClient.delete(`http://localhost:3001/customer?customer_id=${customerId}`));
  }

  public insertCustomer(customer: Customer): Promise<any> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/customer`, customer, options)); 
  }

  public updatetCustomer(customerId: number, customer: Customer): Promise<any> {
    return firstValueFrom(this.httpClient.put(`http://localhost:3001/customer?customer_id=${customerId}`, customer, options));  
  }


// ------------------ WORKERS --------------------------------
  
  public selectWorkers(prId: number | undefined, eventId: number | undefined = undefined): Promise<readonly Worker[]> {
    let url = 'http://localhost:3001/workers';
    if (prId) { 
      url += `?pr_id=${prId}`;
    } else if (eventId) {
      url += `?event_id=${eventId}`;
    }    
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


// ------------------ WORKERS-EVENTS --------------------------------

  public deleteWorkerEvent(eventId: number): Promise<any> {
    return firstValueFrom(this.httpClient.delete(`http://localhost:3001/event-worker?event_id=${eventId}`));
  }

  public insertWorkerEvent(workerEvent: WorkerEvent): Promise<any> {
    return firstValueFrom(this.httpClient.post(`http://localhost:3001/event-worker`, workerEvent, options)); 
  }


// ------------------ WORKERS-PROJECTS --------------------------------

public insertWorkerProject(workerProject: WorkerProject): Promise<any> {
  return firstValueFrom(this.httpClient.post(`http://localhost:3001/worker-project`, workerProject, options)); 
}

}
