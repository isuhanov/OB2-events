import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Events } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: readonly Events[] = [];

  constructor(private dbconnection: DbconnectionService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  public getEvents(): void {
    this.dbconnection.selectEvents().then((events: readonly Events[]) => {
      this.events = events;
      console.log(events);
    })
  }

}
