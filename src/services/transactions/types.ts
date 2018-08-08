import { IMoney } from 'utils/money/types';
import { IBankAccount } from 'services/bank-accounts/types';
import { ICustomer } from 'services/customers/types';
import { ICategory } from 'services/categories/types';

export interface ITransferOut {
  id:          number;
  amount:      IMoney;
  category:    ICategory;
  bankAccount: IBankAccount;
  date?:       Date;
  comment?:    string;
}

export interface ITransaction {
  id:          number;
  amount:      IMoney;
  category:    ICategory;
  bankAccount: IBankAccount;
  customer?:   ICustomer;
  date?:       Date;
  comment?:    string;
  isViewed:    boolean;

  transfer_out?: ITransferOut;
}

export interface ITransactionParams {
  amount?:        string;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  date?:          Date;
  comment?:       string;
}
