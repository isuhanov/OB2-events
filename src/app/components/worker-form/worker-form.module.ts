import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerFormComponent } from './worker-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WorkerFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
  exports: [
    WorkerFormComponent
  ]
})
export class WorkerFormModule { }
