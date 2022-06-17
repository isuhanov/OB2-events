import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Events, Project, Worker } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    theme: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50)
    ]),
    timeStart: new FormControl('', [
      Validators.required
    ]),
    timeEnd: new FormControl('', [
      Validators.required
    ]),
    place: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    projectId: new FormControl('', [
      Validators.required
    ]),
    workers: new FormControl([], [
      Validators.required
    ]),
  })

  public workers: readonly Worker[] = [];
  public projects: readonly Project[] = [];
  public eventProject: Project = {
    project_id: -1,
    project_name: '',
    create_date: '',
    deadline: '',
    descr: '',
    price: 0,
    status: '',
    customer_name: ''
  };


  public isUpdated: boolean = false;
  public eventId: number = 0;
  
  private subscription: Subscription;
  constructor(private dbconnection: DbconnectionService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.dbconnection.selectEvent(params['id']).then((events: readonly Events[]) => {
          this.dbconnection.selectWorkers(undefined, params['id']).then((selectWorkers: readonly Worker[]) => {
            this.dbconnection.selectProject(events[0].project_id).then((project: readonly Project[]) => {
              this.isUpdated = true;
              this.eventId = params['id'];
              this.form.patchValue({
                theme: events[0].theme,
                timeStart: events[0].time_start,
                timeEnd: events[0].time_end,
                place: events[0].place
              })
              this.workers = selectWorkers;
              this.eventProject = project[0]
            })
          })
        })
      }
    });
  }

  ngOnInit(): void {
    this.dbconnection.selectProjects().then((projects: readonly Project[]) => {
      this.projects = projects;
    })

    this.dbconnection.selectWorkers(undefined).then((workers: readonly Worker[]) => {
      this.workers = workers
    })
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  public onSaveClick(): void {
    const controls = this.form.controls;

    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }


    if (this.isUpdated) {
      // console.log(this.form.value);
      this.dbconnection.updatetEvent(this.eventId, this.form.value).then((err) => {
        if (!err) {
          this.router.navigate(['/events']);
        } else {
          console.log('Что-то пошло не так');
        }
      })
    } else {
      console.log(this.form.value);
      this.dbconnection.insertEvent(this.form.value).then((res: any) => {
        if(res) {
          this.form.value.workers.forEach((worker: number)=>{            
            this.dbconnection.insertWorkerEvent({event_id: res.insertId,  worker_id: worker}).then(err => {
              console.log(err);
              if (!err) {
                this.router.navigate(['/events']);
              } else {
                console.log('Что-то пошло не так');
              }
            })
          })
        }
      })
    }
  }
}