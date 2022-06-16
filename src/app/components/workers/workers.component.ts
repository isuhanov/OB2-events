import { Component, OnInit } from '@angular/core';
import { Project, Worker } from 'src/app/domain';
import { ActivatedRoute} from '@angular/router';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ob-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  public workers: readonly Worker[] = [];
  public prId: number | undefined;
  public eventId: number | undefined;
  private subscription: Subscription;

  constructor(private dbconnection: DbconnectionService,
              private activateRoute: ActivatedRoute) { 
    this.subscription = activateRoute.params.subscribe(params => {
      this.prId = params['id']
      this.eventId = params['event-id']
    });
  }

  ngOnInit(): void {
    this.getWorkers()
  }

  public getWorkers(): void {
    if (this.eventId) {
      this.dbconnection.selectWorkers(undefined, this.eventId).then((workers:readonly Worker[]) => {
        this.workers = workers;
      });
    } else {
      this.dbconnection.selectWorkers(this.prId).then((workers:readonly Worker[]) => {
        this.workers = workers;
      });
    }
  }

}
