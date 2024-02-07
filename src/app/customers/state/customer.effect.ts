import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as store from "@ngrx/store";
import {CustomerService} from "../customer.service";
import * as CustomerActions from "../state/customer.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { Customer } from "../customer.model";

@Injectable()
export class CustomerEffect{

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ){}

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<CustomerActions.LoadCustomers>(
        CustomerActions.CustomerActionTypes.LOAD_CUSTOMERS
      ),
      mergeMap((actions: CustomerActions.LoadCustomers) => this.customerService.getCustomers().pipe(
        map(
          (customers: Customer[]) => new CustomerActions.LoadCustomersSuccess(customers)
        ),
        catchError(err => of(new CustomerActions.LoadCustomersFail(err)))
      )
      )
    );
  });

  loadCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<CustomerActions.LoadCustomer>(
        CustomerActions.CustomerActionTypes.LOAD_CUSTOMER
      ),
      mergeMap((action: CustomerActions.LoadCustomer) => this.customerService.getCustomerById(action.payload).pipe(
        map(
          (customer: Customer) => new CustomerActions.LoadCustomerSuccess(customer)
        ),
        catchError(err => of(new CustomerActions.LoadCustomerFail(err)))
      )
      )
    );
  });

  createCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<CustomerActions.CreateCustomer>(
        CustomerActions.CustomerActionTypes.CREATE_CUSTOMER
      ),
      map((action: CustomerActions.CreateCustomer) => action.payload),
      mergeMap((customer:Customer) =>
        this.customerService.createCustomer(customer).pipe(
        map(
          (newCustomer: Customer) => new CustomerActions.CreateCustomerSuccess(newCustomer)
        ),
        catchError(err => of(new CustomerActions.CreateCustomerFail(err)))
      )
      )
    );
  });


  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<CustomerActions.UpdateCustomer>(
        CustomerActions.CustomerActionTypes.UPDATE_CUSTOMER
      ),
      map((action: CustomerActions.UpdateCustomer) => action.payload),
      mergeMap((customer:Customer) =>
        this.customerService.updateCustomer(customer).pipe(
        map(
          (updateCustomer: Customer) =>
            new CustomerActions.UpdateCustomerSuccess({
              id: updateCustomer.id!,
              changes: updateCustomer
            })
        ),
        catchError(err => of(new CustomerActions.UpdateCustomerFail(err)))
      )
      )
    );
  });

  deleteCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<CustomerActions.DeleteCustomer>(
        CustomerActions.CustomerActionTypes.DELETE_CUSTOMER
      ),
      map((action: CustomerActions.DeleteCustomer) => action.payload),
      mergeMap((id: number) =>
        this.customerService.deleteCustomer(id).pipe(
        map(() => new CustomerActions.DeleteCustomerSuccess(id)
        ),
        catchError(err => of(new CustomerActions.DeleteCustomerFail(err)))
      )
      )
    );
  });
}

