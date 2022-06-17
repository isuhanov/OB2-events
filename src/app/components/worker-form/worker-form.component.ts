import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Worker } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss']
})
export class WorkerFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    fio: new FormControl('',
                        [
                          Validators.required,
                          Validators.minLength(10),
                          Validators.maxLength(150)
                        ]),
    bd: new FormControl('',
                        [
                          Validators.required,
                        ]),
    phone: new FormControl('', 
                          [
                            Validators.required,
                            Validators.minLength(11),
                            Validators.maxLength(11)
                          ]),
    email: new FormControl('',
                          [
                            Validators.required,
                            Validators.minLength(4),
                            Validators.maxLength(50),
                            Validators.email
                          ]),
    post: new FormControl('',
                          [
                            Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(50)
                          ]),
    salary: new FormControl(0,
                            [
                              Validators.required,
                              Validators.min(5000),
                            ])
  })

  private subscription: Subscription;
  public isUpdated: boolean = false;
  public wId: number = 0;

  constructor(private dbconnection: DbconnectionService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.dbconnection.selectWorker(params['id']).then((worker: readonly Worker[]) => {
          this.isUpdated = true;
          this.wId = params['id'];
          this.form.setValue({
            fio: worker[0].FIO,
            bd: worker[0].bd,
            phone: worker[0].phone,
            email: worker[0].email,
            post: worker[0].post,
            salary: worker[0].salary
          })
        });
      }
    });
  }

  ngOnInit(): void {
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
      this.dbconnection.updatetWorker(this.wId, this.form.value).then(err => {
        if (!err) {
          this.router.navigate(['/workers']);
        } else {
          console.log('Что-то пошло не так');
        }
      });
    } else {
      this.dbconnection.insertWorker(this.form.value).then(err => {
        if (!err) {
          this.router.navigate(['/workers']);
        } else {
          console.log('Что-то пошло не так');
        }
      });
    }

  }

}
