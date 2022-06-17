import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit {

  
  @Input()
  public index: number = 0;
  @Input()
  public id: number = 0;
  @Input()
  public customerName: string = '';
  @Input()
  public phone: string = '';
  @Input()
  public email: string = '';
  @Input()
  public adress: string = '';

  @Output()
  public onDelete = new EventEmitter();

  constructor(private dbconnection: DbconnectionService) { }

  ngOnInit(): void {
  }

  public onClickeDelete(): void {
    this.dbconnection.deleteCustomer(this.id).then((err) => {
      if (!err) {
        this.onDelete.emit();
      } else {
        console.log('Что-то пошло не так');
      }
    })
  }
}
