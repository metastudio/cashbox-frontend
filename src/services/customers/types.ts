import { ID, Status } from 'model-types';

interface ICustomer {
  id:               ID;
  name:             string;
  invoiceDetails:   string;
}

interface ICustomerParams {
  name?:           string;
  invoiceDetails?: string;
}

interface ICustomerState {
  data:   ICustomer | null;
  status: Status;
  error:  Error | null;
}

interface ICustomersState {
  items:  ICustomer[];
  status: Status;
  error:  Error | null;
}

export {
  ICustomer,
  ICustomerParams,
  ICustomerState,
  ICustomersState,
};
