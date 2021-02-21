import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from '../expense/expense.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule
  ]
})
export class ExpenseModule { }
