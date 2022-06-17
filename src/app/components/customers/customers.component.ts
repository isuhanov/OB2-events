import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public customers: readonly Customer[] = [];
  public prId: number | undefined;
  public eventId: number | undefined;
  // private subscription: Subscription;
  public isExists: boolean = true;


  constructor(private dbconnection: DbconnectionService,
              private activateRoute: ActivatedRoute) { 
    // this.subscription = activateRoute.params.subscribe(params => {
    //   this.prId = params['id']
    //   this.eventId = params['event-id']
    // });
  }

  ngOnInit(): void {
    this.getCustomers()
  }

  public getCustomers(): void {
    this.dbconnection.selectCustomers().then((customers: readonly Customer[]) => {
      if (customers.length == 0) {
        this.isExists = false;
      } else {
        this.customers = customers;
        this.isExists = true;
      }
    });
  }

}
