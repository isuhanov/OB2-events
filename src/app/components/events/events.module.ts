import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventItemModule } from '../event-item/event-item.module';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventItemModule,
    AppRoutingModule
  ],
  exports: [
    EventsComponent
  ]
})
export class EventsModule { }
