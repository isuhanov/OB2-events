import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkerFormComponent } from './components/worker-form/worker-form.component';
import { WorkerFormModule } from './components/worker-form/worker-form.module';
import { WorkersComponent } from './components/workers/workers.component';

const routes: Routes = [
  {path: 'projects', component: ProjectsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'workers/form', component: WorkerFormComponent},
  {path: 'workers/:id', component: WorkersComponent},
  {path: 'workers', component: WorkersComponent},
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  // {path: '**'}, // ДОПИСАТЬ 404
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    WorkerFormModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
