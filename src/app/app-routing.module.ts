import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {path: 'projects', component: ProjectsComponent},
  {path: 'events', component: EventsComponent},
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
