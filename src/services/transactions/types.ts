import { Money } from 'utils/money';
import { BankAccount } from 'services/bank-accounts/types';
import { Customer } from 'services/customers/types';
import { Category } from 'services/categories/types';

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