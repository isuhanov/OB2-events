import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer, Project, Worker } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})

export class ProjectFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(150)
    ]),
    crDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d\d\d\d-\d\d-\d\d/)
    ]),
    deadline: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d\d\d\d-\d\d-\d\d/)
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1000)
    ]),
    descr: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    customerName: new FormControl('', [
      Validators.required
    ]),
    status: new FormControl(null, [
      Validators.required
    ]),
    workers: new FormControl([], [
      Validators.required
    ]),
  })

  public workers: readonly Worker[] = [];
  public customers: readonly Customer[] = [];
  public projectCustomer: Customer = {
    customer_id: null,
    customer_name: '',
    phone: '',
    email: '',
    adress: ''
  };
  
  public selectWorkers: number[] | null = null;

  public isUpdated: boolean = false;
  public projectId: number = 0;
  
  private subscription: Subscription;
  constructor(private dbconnection: DbconnectionService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.dbconnection.selectProject(params['id']).then((project: readonly Project[]) => {
          this.dbconnection.selectWorkers(params['id']).then((selectWorkers:readonly Worker[]) => {
            this.dbconnection.selectCustomer(project[0].customer_id).then((customer: readonly Customer[]) => {
              this.isUpdated = true;
              this.projectId = params['id'];
              this.form.patchValue({
                name: project[0].project_name,
                crDate: project[0].create_date,
                deadline: project[0].deadline,
                price: project[0].price,
                descr: project[0].descr,
                status: project[0].status
              })
              this.workers = selectWorkers;
              this.selectWorkers = selectWorkers.map(worker => worker.worker_id);
              this.projectCustomer = customer[0];
            })
          });
        })
      }
    });
  }

  ngOnInit(): void {
    this.dbconnection.selectWorkers(undefined).then((workers:readonly Worker[]) => {
      this.workers = workers;
    });

    this.dbconnection.selectCustomers().then((customers:readonly Customer[]) => {
      this.customers= customers;
    });
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
      this.dbconnection.updatetProject(this.projectId, this.form.value).then(err => {
        if (!err) {
          this.router.navigate(['/projects']);
        } else {
          console.log('Что-то пошло не так');
        }
      })
    } else {
      this.dbconnection.insertProject(this.form.value).then((res: any) => {
        if(res) {
          this.form.value.workers.forEach((worker: number)=>{            
            this.dbconnection.insertWorkerProject({project_id: res.insertId,  worker_id: worker}).then(err => {
              if (!err) {
                this.router.navigate(['/projects']);
              } else {
                console.log('Что-то пошло не так');
              }
            })
          })
        }
      });
    }

  }

}
