import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    ProjectItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    ProjectItemComponent
  ]
})
export class ProjectItemModule { }
