import { Component, OnInit } from '@angular/core';
import * as customerActions from "../state/customer.actions"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCustomer from "../state/customer.reducer";
import { Observable, map } from 'rxjs';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ){}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      id:null,
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required]
    })
  }

  customer$: Observable<Customer | undefined> = this.store.select(
    fromCustomer.getCurrentCustomer
  ).pipe(
    map(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        });
      }
      return currentCustomer;
    })
  );

  subscription = this.customer$.subscribe();


  updateCustomer(){
    const updateCustomer: Customer = {
      name: this.customerForm.get('name')?.value,
      phone: this.customerForm.get('phone')?.value,
      address: this.customerForm.get('address')?.value,
      membership: this.customerForm.get('membership')?.value,
      id: this.customerForm.get('id')?.value,
    };

    this.store.dispatch(new customerActions.UpdateCustomer(updateCustomer))
  }
}
