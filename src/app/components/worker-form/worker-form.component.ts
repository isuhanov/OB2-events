import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

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
      
    
    console.log(this.form.value);
  }

}
