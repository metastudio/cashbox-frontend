import { Money } from 'utils/money';
import { BankAccount } from 'services/bank-accounts/types';

export enum Status {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export interface Customer {
  id:               number;
  name:             string;
  invoiceDetails:   string;
}

export interface Category {
  id:       string;
  name:     string;
  type:     string;
}

export interface Pagination {
  current: number;
  previous?: number;
  pages: number;
  next?: number;
}

export interface CategoryParams {
  name: string;
  type: string;
}

export interface TransferOut {
  id:          number;
  amount:      Money;
  category:    Category;
  bankAccount: BankAccount;
  date?:       Date;
  comment?:    string;
}

export interface Transaction {
  id:          number;
  amount:      Money;
  category:    Category;
  bankAccount: BankAccount;
  customer?:   Customer;
  date?:       Date;
  comment?:    string;
  isViewed:    boolean;

  transfer_out?: TransferOut;
}

export interface TransactionParams {
  amount?:        string;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  date?:          Date;
  comment?:       string;
}

export interface InvoiceItem {
  id:           number;
  customerId:   number;
  amount:       Money;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface Invoice {
  id:                    number;
  customerId:            number;
  customerName:          string;
  amount:                Money;
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
