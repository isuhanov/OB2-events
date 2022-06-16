import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  @Input()
  public index: number = 0;
  @Input()
  public id: number = 0;
  @Input()
  public theme: string = '';
  @Input()
  public timeStart: string = '';
  @Input()
  public timeEnd: string = '';
  @Input()
  public place: string = '';
  @Input()
  public projectId: number = 0; 
  @Input()
  public projectName: string | null = ''
  
  @Output()
  public onDelete = new EventEmitter();

  constructor(private dbconnection: DbconnectionService) { }

  ngOnInit(): void {
  }

  public onClickeDelete(): void {
    this.dbconnection.deleteWorkerEvent(this.id).then((err) => {
      if (!err) {
        this.dbconnection.deleteEvent(this.id).then((err) => {
          if (!err) {
              this.onDelete.emit();
            } else {
              console.log('Что-то пошло не так');
            }
        })
      } else {
        console.log('Что-то пошло не так');
      }
    });
    // this.dbconnection.deleteWorker(this.id).then((err) => {
    //   if (!err) {
    //     this.onDelete.emit();
    //   } else {
    //     console.log('Что-то пошло не так');
    //   }
    // });
  }

}
