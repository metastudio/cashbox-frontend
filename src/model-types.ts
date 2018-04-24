import { Money } from 'utils/money';

export interface Customer {
  id:               number;
  name:             string;
  invoice_details:  string;
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

export interface Transaction {
  id:          number;
  amount:      Money;
  category:    Category;
  bankAccount: BankAccount;
  customer:    Customer;
  date?:       Date;
  comment?:    string;
}

export interface TransactionParams {
  amount?:        Money;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  date?:          Date;
  comment?:       string;
}

export interface InoviceItem {
  id:           number;
  customerId:   number;
  amount:       Money;
  date?:        Date;
  hours?:       number;
  description?: string;
  customer?:    Customer;
}

export interface Invoice {
  id:               number;
  customerId:       number;
  customerName:     string;
  amount:           Money;
  currency:         string;
  number:           number;
  endsAt:           Date;
  paidAt?:          Date;
  startsAt?:        Date;
  sentAt?:          Date;
  invoiceDetails?:  string;
  customerDetails?: string;
  customer?:        Customer;

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
