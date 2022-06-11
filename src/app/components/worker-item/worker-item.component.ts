import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';


@Component({
  selector: 'ob-worker-item',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.scss']
})
export class WorkerItemComponent implements OnInit {

  @Input()
  public index: number = 0;
  @Input()
  public id: number = 0;
  @Input()
  public fio: string = '';
  @Input()
  public bd: string = '';
  @Input()
  public phone: string = '';
  @Input()
  public email: string = '';
  @Input()
  public post: string = '';
  @Input()
  public salary: number = 0;

  @Output()
  public onDelete = new EventEmitter();

  constructor(private dbconnection: DbconnectionService) { }

  ngOnInit(): void {
  }

  public onClickeDelete(): void {
    this.dbconnection.deleteWorker(this.id).then((err) => {
      if (!err) {
        this.onDelete.emit();
      } else {
        console.log('Что-то пошло не так');
      }
    });
  }

}
