import { Money } from 'utils/money';
import { BankAccount } from 'services/bank-accounts/types';
import { Customer } from 'services/customers/types';

export enum Status {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
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
