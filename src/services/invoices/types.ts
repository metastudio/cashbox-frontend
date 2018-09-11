import { ID, IPagination, Status } from 'model-types';
import { IMoney } from 'utils/money';

export interface InvoiceItem {
  id:           number;
  customerId:   number;
  amount:       IMoney;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface IInvoice {
  id:                    number;
  customerId:            number;
  customerName:          string;
  amount:                IMoney;
  currency:              string;
  bankAccountId?:        number;
  number:                number;
  endsAt:                Date;
  paidAt?:               Date;
  startsAt?:             Date;
  sentAt?:               Date;
  invoiceDetails?:       string;
  customerDetails?:      string;
  hasIncomeTransaction?: boolean;

  isCompleted: boolean;
  isOverdue:   boolean;

  invoiceItems: InvoiceItem[];
}

export interface InvoiceItemParams {
  amount?:      string;
  customerId?:  number;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface InvoiceParams {
  currency?:      string;
  amount?:        string;
  number?:        number;
  bankAccountId?: number;
  customerId?:    number;
  endsAt?:        Date;
  startsAt?:      Date;
  sentAt?:        Date;
  paidAt?:        Date;

  invoiceItemsAttributes: InvoiceItemParams[];
}

export interface IInvoiceState {
  id:     ID | null;
  item:   IInvoice;
  status: Status;
  error:  Error | null;
}

export interface IInvoicesState {
  items:      IInvoice[];
  status:     Status;
  error:      Error | null;
  pagination: IPagination | null;
}

export interface IUnpaidInvoicesCountState {
  count:  number | null;
  status: Status;
  error:  Error | null;
}

export interface IUnpaidInvoicesState {
  items:      IInvoice[];
  status:     Status;
  error:      Error | null;
  pagination: IPagination | null;
}
