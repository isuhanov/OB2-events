import { Component, OnInit } from '@angular/core';
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
  public isExists: boolean = true;


  constructor(private dbconnection: DbconnectionService) { 
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
