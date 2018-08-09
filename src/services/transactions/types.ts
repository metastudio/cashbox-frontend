import { IMoney } from 'utils/money/types';
import { IBankAccount } from 'services/bank-accounts/types';
import { ICustomer } from 'services/customers/types';
import { ICategory } from 'services/categories/types';

interface ITransferOut {
  id:          number;
  amount:      IMoney;
  category:    ICategory;
  bankAccount: IBankAccount;
  date?:       Date;
  comment?:    string;
}

interface ITransaction {
  id:          number;
  amount:      IMoney;
  category:    ICategory;
  bankAccount: IBankAccount;
  customer?:   ICustomer;
  date?:       Date;
  comment?:    string;
  isViewed:    boolean;
}

interface ITransfer extends ITransaction {
  transferOut?: ITransferOut;
}

interface ITransactionParams {
  amount?:        string;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  date?:          Date;
  comment?:       string;
}

interface ITransferParams {
  amount?:        string;
  bankAccountId?: number;
  referenceId?:   number;
  exchangeRate?:  string;
  comission?:     string;
  comment?:       string;
  date?:          Date;
}

export {
  ITransaction, ITransactionParams,
  ITransfer, ITransferParams,
};
