import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './event-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EventFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [
    EventFormComponent
  ]
})
export class EventFormModule { }
