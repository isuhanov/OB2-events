import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer, Worker } from 'src/app/domain';
import { DbconnectionService } from 'src/app/lib/dbconnection.service';

@Component({
  selector: 'ob-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    customerName: new FormControl('',
                        [
                          Validators.required,
                          Validators.minLength(3),
                          Validators.maxLength(150)
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
    adress: new FormControl('',
                          [
                            Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(150)
                          ])
  })

  private subscription: Subscription;
  public isUpdated: boolean = false;
  public customerId: number = 0;

  constructor(private dbconnection: DbconnectionService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.dbconnection.selectCustomer(params['id']).then((customer: readonly Customer[]) => {
          this.isUpdated = true;
          this.customerId = params['id'];
          this.form.setValue({
            customerName: customer[0].customer_name,
            phone: customer[0].phone,
            email: customer[0].email,
            adress: customer[0].adress
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
      this.dbconnection.updatetCustomer(this.customerId, this.form.value).then((err) => {
        if (!err) {
          this.router.navigate(['/customers']);
        } else {
          console.log('Что-то пошло не так');
        }
      })
    } else {
      this.dbconnection.insertCustomer(this.form.value).then(err => {
        if (!err) {
          this.router.navigate(['/customers']);
        } else {
          console.log('Что-то пошло не так');
        }
      });
    }

  }

}
