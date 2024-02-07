import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule, Routes } from '@angular/router'
import { StoreModule } from '@ngrx/store';
import { customerResucer } from './state/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect } from './state/customer.effect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const customersRoutes: Routes = [{path:"", component:CustomerComponent}]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(customersRoutes),
    StoreModule.forFeature("customers", customerResucer),
    EffectsModule.forFeature([CustomerEffect])
  ],
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ]
})
export class CustomersModule { }
