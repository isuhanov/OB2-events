import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
