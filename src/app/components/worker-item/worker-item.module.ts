import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerItemComponent } from './worker-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    WorkerItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    WorkerItemComponent
  ]
})
export class WorkerItemModule { }
