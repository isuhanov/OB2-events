import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers.component';
import { WorkerItemModule } from '../worker-item/worker-item.module';



@NgModule({
  declarations: [
    WorkersComponent
  ],
  imports: [
    CommonModule,
    WorkerItemModule,
  ],
  exports: [
    WorkersComponent
  ]
})
export class WorkersModule { }
