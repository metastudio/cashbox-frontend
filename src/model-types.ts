import { Money } from 'utils/money';

export interface Customer {
  id:       number;
  name:     string;
}

export interface BankAccount {
  id:       number;
  name:     string;
}

export interface Category {
  id:       number;
  name:     string;
  type:     string;
}

export interface InoviceItem {
  id:           number;
  customerId:   number;
  amount:       Money;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface Invoice {
  id:           number;
  customerId:   number;
  customerName: string;
  amount:       Money;
  currency:     string;
  number:       number;
  endsAt:       Date;
  paidAt?:      Date;
  startsAt?:    Date;
  sentAt?:      Date;

  invoiceItems: InoviceItem[];
}

export interface InvoiceItemParams {
  amount?:      string;
  customerId?:  number;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface InvoiceParams {
  currency?:    string;
  amount?:      string;
  number?:      number;
  customerId?:  number;
  endsAt?:      Date;
  startsAt?:    Date;
  sentAt?:      Date;
  paidAt?:      Date;

  invoiceItemsAttributes: InvoiceItemParams[];
}
