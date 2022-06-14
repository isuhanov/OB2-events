import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectItemModule } from '../project-item/project-item.module';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectItemModule,
    AppRoutingModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
