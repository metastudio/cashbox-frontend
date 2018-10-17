import { ICustomersState, ICustomerState } from './types';

const selectCustomers       = (state: { customers: ICustomersState }) => state.customers.items;
const selectCustomersStatus = (state: { customers: ICustomersState }) => state.customers.status;

const selectCustomer       = (state: { customer: ICustomerState }) => state.customer.data;
const selectCustomerStatus = (state: { customer: ICustomerState }) => state.customer.status;

export {
  selectCustomers,
  selectCustomersStatus,

  selectCustomer,
  selectCustomerStatus,
};
