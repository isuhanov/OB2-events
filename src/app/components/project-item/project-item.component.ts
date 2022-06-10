import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ob-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input()
  public index: number = 0;
  @Input()
  public id: number = 0;
  @Input()
  public name: string = '';
  @Input()
  public crDate: string = '';
  @Input()
  public deadline: string = '';
  @Input()
  public price: number = 0;
  @Input()
  public descr: string = '';
  @Input()
  public customerName: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
