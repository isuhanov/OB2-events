import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItemComponent } from './event-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    EventItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    EventItemComponent
  ]
})
export class EventItemModule { }
