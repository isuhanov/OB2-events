import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerFormModule } from './components/customer-form/customer-form.module';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersModule } from './components/customers/customers.module';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventFormModule } from './components/event-form/event-form.module';
import { EventsComponent } from './components/events/events.component';
import { Page404Component } from './components/page404/page404.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectFormModule } from './components/project-form/project-form.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkerFormComponent } from './components/worker-form/worker-form.component';
import { WorkerFormModule } from './components/worker-form/worker-form.module';
import { WorkersComponent } from './components/workers/workers.component';

const routes: Routes = [
  {path: 'projects/form/:id', component: ProjectFormComponent},
  {path: 'projects/form', component: ProjectFormComponent},
  {path: 'projects', component: ProjectsComponent},

  {path: 'events/form/:id', component: EventFormComponent},
  {path: 'events/form', component: EventFormComponent},
  {path: 'events', component: EventsComponent},

  {path: 'customer/form/:id', component: CustomerFormComponent},
  {path: 'customers/form', component: CustomerFormComponent},
  {path: 'customers', component: CustomersComponent},

  {path: 'worker/form/:id', component: WorkerFormComponent},
  {path: 'workers/form', component: WorkerFormComponent},
  {path: 'workers/:id', component: WorkersComponent},
  {path: 'workers-events/:event-id', component: WorkersComponent},
  {path: 'workers', component: WorkersComponent},

  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    WorkerFormModule,
    ProjectFormModule,
    EventFormModule,
    CustomerFormModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
