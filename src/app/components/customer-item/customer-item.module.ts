import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerItemComponent } from './customer-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    CustomerItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    CustomerItemComponent
  ]
})
export class CustomerItemModule { }
