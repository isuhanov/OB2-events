import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventFormModule } from './components/event-form/event-form.module';
import { EventsComponent } from './components/events/events.component';
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

  {path: 'worker/form/:id', component: WorkerFormComponent},
  {path: 'workers/form', component: WorkerFormComponent},
  {path: 'workers/:id', component: WorkersComponent},
  {path: 'workers-events/:event-id', component: WorkersComponent},
  {path: 'workers', component: WorkersComponent},
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  // {path: '**'}, // ДОПИСАТЬ 404
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    WorkerFormModule,
    ProjectFormModule,
    EventFormModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
