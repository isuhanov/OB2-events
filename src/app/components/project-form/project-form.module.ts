import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from './project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProjectFormComponent
  ]
})
export class ProjectFormModule { }
