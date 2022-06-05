import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectItemModule } from '../project-item/project-item.module';



@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectItemModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
