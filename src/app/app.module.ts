import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsModule } from './components/events/events.module';
import { ProjectsModule } from './components/projects/projects.module';
import { WorkersModule } from './components/workers/workers.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ProjectsModule,
    EventsModule,
    WorkersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
