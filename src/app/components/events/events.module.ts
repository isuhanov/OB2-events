import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventItemModule } from '../event-item/event-item.module';



@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventItemModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
