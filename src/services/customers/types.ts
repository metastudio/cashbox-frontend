import { ID } from 'model-types';

interface ICustomer {
  id:               ID;
  name:             string;
  invoiceDetails:   string;
}

interface ICustomerParams {
  name?:           string;
  invoiceDetails?: string;
}

export { ICustomer, ICustomerParams };
