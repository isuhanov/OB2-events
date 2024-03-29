import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersComponent } from './workers.component';
import { WorkerItemModule } from '../worker-item/worker-item.module';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    WorkersComponent
  ],
  imports: [
    CommonModule,
    WorkerItemModule,
    AppRoutingModule
  ],
  exports: [
    WorkersComponent
  ]
})
export class WorkersModule { }
