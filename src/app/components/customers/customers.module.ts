import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerItemModule } from '../customer-item/customer-item.module';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CustomerItemModule
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule { }
